import pandas as pd
import pymysql
import joblib
import xgboost as xgb
import os
from flask import Flask, render_template, request,jsonify
from flask_cors import CORS, cross_origin
import pickle
import logging
from logging.handlers import RotatingFileHandler
import gensim
from werkzeug.datastructures import ImmutableMultiDict

app = Flask(__name__)
CORS(app, origins='*', allow_headers='*', supports_credentials=True)

app.logger.setLevel(logging.DEBUG)

file_handler = RotatingFileHandler('flask.log', maxBytes=1024 * 1024 * 100, backupCount=20)
file_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
app.logger.addHandler(file_handler)
loaded_model = joblib.load('kmer_model.sav')

with open('xgb_model.pkl', 'rb') as f:
        model = pickle.load(f)

def get_db_data():
    #database connection
    connection = pymysql.connect(host="127.0.0.1", port=3306, user="root", passwd="", database="gp_database")
    cursor = connection.cursor()
    # Create a cursor object to execute SQL queries
    cursor = connection.cursor()

    # Define the SELECT query
    query = "SELECT id,name,content FROM cases"

    # Execute the query
    cursor.execute(query)

    # Fetch all the rows returned by the query
    rows = cursor.fetchall()

    # Process the rows
    id_lis = []
    name_lis=[]
    cont_lis=[]
    for row in rows:
        id_lis .append(row[0])
        name_lis.append(row[1])
        cont_lis.append(row[2])

    data = {'id': id_lis , 'name': name_lis, 'seq': cont_lis}    
    db_df = pd.DataFrame(data)
    cursor.close()
    connection.close()
    
    return db_df, cont_lis

def get_folder_data(folder_path):
    files = os.listdir(folder_path)
    data = []
    for file in files:
        file_path = os.path.join(folder_path, file)
        if os.path.isfile(file_path):
            with open(file_path, 'r') as f:
                content = f.read()
                data.append(content)
    return data

def compare_sequences(father, child):
    match_count = 0
    total_count = 0
    length = int(len(father) /2 )
    allel1_father = father[0:length]
    allel2_father = father[length+1 :]
    allel1_child = child[:length]
    allel2_child = child[length+1 :]
    # Compare allel1 sequences
    for i in range(len(allel1_father)):
        if allel1_father[i] == allel1_child[i]:
            match_count += 1
        total_count += 1

    # Compare allel2 sequences
    for i in range(len(allel2_father)):
        if allel2_father[i] == allel2_child[i]:
            match_count += 1
        total_count += 1

    # Calculate likelihood of paternity
    likelihood = (match_count / total_count) * 100
    if likelihood >77:
        return 1
    else : 
        return 0
    return int(likelihood)

  
def create_df(child_seq,posssiable_parent_seq):
    repeated_value = child_seq[0]

    data = {
    'posiable_child': [repeated_value] * len(posssiable_parent_seq),
    'posiable_parent': posssiable_parent_seq
    }
    # Convert the dictionary to a dataframe
    test_df = pd.DataFrame(data)
    return test_df

def toCategory(df_):
    df_ca = df_.copy()
    df_ca['posiable_parent'] = df_ca['posiable_parent'].astype('category')
    df_ca['posiable_child'] = df_ca['posiable_child'].astype('category')
    return df_ca

def encode_df(df_):
    df_c = df_.copy()
    
    X_t_c = loaded_model.transform(df_c['posiable_child'])
    
    X_t_p = loaded_model.transform(df_c['posiable_parent'])
    
    kmer_embeddings_t_c = X_t_c.toarray()
    kmer_embeddings_t_p = X_t_p.toarray()
    
    for i in range (0,len(kmer_embeddings_t_c[0])):
        df_c['child_gene_k_' + str(i)] = [kmer_embeddings_t_c[j][i] for j in range(0,len(df_c))]
        df_c['parent_gene_k_' + str(i)] = [kmer_embeddings_t_p[j][i] for j in range(0,len(df_c))]
    
    
    return df_c.drop(columns=['posiable_child','posiable_parent'],axis=1)

def apply_xgb(df_,df):
    if len(df.iloc[0,0]) != 78216:  return [0,0,0,0,0,0,0,0,0,0]
    y_pred = model.predict(df_)
    for i,v in enumerate(y_pred):
        if v ==1:
            actual_value = compare_sequences(df.iloc[i,1],df.iloc[i,0])
            y_pred[i] = actual_value
            
    return y_pred

@app.route('/')


def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    
    file = request.files['file']
    file_contents = file.read().decode('utf-8')
    
    file.close()
    
    



    child_seq = list([file_contents])
    

    a,v = get_db_data()
    
    df = create_df(child_seq,v)

    df_cat = toCategory(df)

    df_encoded = encode_df(df_cat)

    y = apply_xgb(df_encoded,df)
    person_matched = 'No Matches in DB'
    for ind,val in enumerate( y):
        if val ==1 :
            person_matched = {'Id': a.iloc[ind,0], 'Name': a.iloc[ind,1]}
            
    response = jsonify({'person_matched': person_matched})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
   
            
            
    return render_template('index.html', prediction_text=person_matched)

if __name__ == "__main__":
        app.run()

