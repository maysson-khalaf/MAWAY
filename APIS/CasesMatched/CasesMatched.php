<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');
header(
    'Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, X-Requested-With , Authorization'
);
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the person's name and case ID from the request body
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    $name = $data['person_matched']['Name'];
    $case_id = $data['case_id'];

    // Connect to the MySQL database
    $servername = "localhost";
    $username = "your_username";
    $password = "your_password";
    $dbname = "your_database";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert the data into the cases_matched table
    $sql = "INSERT INTO cases_matched (relative_name, case_id) VALUES ((SELECT id FROM persons WHERE name = '$name'), '$case_id')";

    if ($conn->query($sql) === TRUE) {
        $response = array(
            'message' => 'Data inserted successfully'
        );
    } else {
        $response = array(
            'message' => 'Error inserting data: ' . $conn->error
        );
    }

    // Close the database connection
    $conn->close();

    // Send the response back as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}




















?>