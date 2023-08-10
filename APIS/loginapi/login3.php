<?php



require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php'; // include the config file

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost:3306", "root", "", "gp_database");
if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}
else{
    $eData = file_get_contents("php://input");
    if(isset($eData) && !empty($eData)){
        $dData = json_decode($eData, true);

        $user = $dData['user'];
        $pass = $dData['pass'];
        $result = "";

        if($user != "" and $pass != ""){
            $sql = "SELECT * FROM users WHERE name='$user' ";
            $res = mysqli_query($conn, $sql);

            if(mysqli_num_rows($res) != 0){
                $row = mysqli_fetch_array($res);
                if($pass != $row['password'] ){
                    $result = "كلمه المرو خاطئه";
                }
                else{
                    $payload = array(
                        "sub" => $row['id'],
                        "name" => $row['name'],
                        "SSN" => $row['SSN'],
                        "role" => $row['role'],
                        "email" => $row['email'],
                        "iat" => time(), // token issued at time
                        "exp" => time() + (60 * 60 * 24) // token expires in 24 hours
                    );
                    $jwt = JWT::encode($payload, SECRET_KEY, 'HS256'); // generate token using the constant from the config file
                    $result = "تمت عملية التسجيل ينجاح";
                }
            }
            else{
                $result = "الاسم غير متاح";
            }
        }
        else{
            $result = "";
        }

        $conn -> close();
        $response[] = array(
            "result" => $result,
            "token" => $jwt // include the token in the response
        );
        echo json_encode($response);
    }
}

?>