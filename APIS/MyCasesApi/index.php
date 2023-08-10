<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php'; // include the config file

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Get the JWT from the Authorization header
$jwt = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';

try {
    // Verify and decode the JWT to get the user ID
    // $decoded_token = JWT::decode($jwt, SECRET_KEY, array('HS256'));
    $key = "p8MmxU3PGVxvhkEHYJss9UtvuBRFwn9";
    $decoded_token = array();
    JWT::decode($jwt, $key,array('HS256'), $decoded_token);
    print_r($decoded_token);
    $user_id = $decoded_token->sub;
    
    // Query the database to get all cases related to the user
    $sql = "SELECT * FROM cases WHERE user_id = :user_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $cases = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the results as JSON
    if (count($cases) === 0) {
        echo json_encode(array('message' => 'No cases found for this user.'));
    } else {
        echo json_encode($cases);
    }
} catch (Exception $e) {
    // Return an error message if the JWT is invalid or expired
    http_response_code(401);
    echo json_encode(array('message' => 'Token is expired or invalid.'));
}
?>