<?php
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php'; // include the config file

use Firebase\JWT\JWT;
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

include 'DbConnect.php';
$objDb = new DbConnect();
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $sql = 'SELECT * FROM cases';
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= ' WHERE id = :id';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;
    case 'POST':
    // $user = json_decode( file_get_contents('php://input') );
    // $sql = "INSERT INTO cases( name, phone, address,SSN,lab_name) VALUES( :name, :phone, :address, :SSN, :lab_name )";
    // $stmt = $conn->prepare($sql);
    // $created_at = date('Y-m-d');
    // $stmt->bindParam(':name', $user->name);
    // $stmt->bindParam(':phone', $user->phone);
    // $stmt->bindParam(':address', $user->address);
    // // $stmt->bindParam(':other_name', $user->other_name);
    // $stmt->bindParam(':SSN', $user->SSN);
    // $stmt->bindParam(':lab_name', $user->lab_name);
    // if($stmt->execute()) {
    //     $response = ['status' => 1, 'message' => 'Record created successfully.'];
    // } else {
    //     $response = ['status' => 0, 'message' => 'Failed to create record.'];
    // }
    // echo json_encode($response);
    // break;

    // $name = $_POST['name'];
    // $phone = $_POST['phone'];
    // $address = $_POST['address'];
    // $SSN = $_POST['SSN'];
    // $lab_name = $_POST['lab_name'];

    // $target_dir = "E:\REACT\React-PHP\uploads/";
    // $target_file = $target_dir . basename($_FILES["file"]["name"]);
    // $content = file_get_contents($_FILES["file"]["tmp_name"]);

    // $uploadOk = 1;
    // $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // // Check if file already exists
    // if (file_exists($target_file)) {
    //     $response = ['status' => 0, 'message' => 'File already exists.'];
    //     $uploadOk = 0;
    // }

    // // Check file size
    // // if ($_FILES["file"]["size"] > 500000) {
    // //     $response = ['status' => 0, 'message' => 'File is toolarge.'];
    // //     $uploadOk = 0;
    // // }

    // // Allow certain file formats
    // // if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    // // && $imageFileType != "gif" ) {
    // //     $response = ['status' => 0, 'message' => 'Only JPG, JPEG, PNG & GIF files are allowed.'];
    // //     $uploadOk = 0;
    // // }

    // // Check if $uploadOk is set to 0 by an error
    // if ($uploadOk == 0) {
    //     $response = ['status' => 0, 'message' => 'File upload failed.'];
    // // if everything is ok, try to upload file
    // } else {
    //     if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    //         $sql = "INSERT INTO cases( name, phone, address, SSN, lab_name, file, content) VALUES( :name, :phone, :address, :SSN, :lab_name, :file ,:content)";
    //         $stmt = $conn->prepare($sql);
    //         $stmt->bindParam(':name', $name);
    //         $stmt->bindParam(':phone',$phone);
    //         $stmt->bindParam(':address', $address);
    //         $stmt->bindParam(':SSN', $SSN);
    //         $stmt->bindParam(':lab_name', $lab_name);
    //         $stmt->bindParam(':file', $target_file);
    //         $stmt->bindParam(':content', $content);
    //         if($stmt->execute()) {
    //             $response = ['status' => 1, 'message' => 'Record created successfully.'];
    //         } else {
    //             $response = ['status' => 0, 'message' => 'Failed to create record.'];
    //         }
    //     } else {
    //         $response = ['status' => 0, 'message' => 'File upload failed.'];
    //     }
    // }
    // echo json_encode($response);
    // break;
    case 'POST':
        // Check if the JWT token is present in the request header and has the correct format
        if (
            isset($_SERVER['HTTP_AUTHORIZATION']) &&
            preg_match(
                '/Bearer\s(\S+)/',
                $_SERVER['HTTP_AUTHORIZATION'],
                $matches
            )
        ) {
            // Get the JWT token from the request header
            $jwt = $matches[1];

            // Check if the secret key is defined
            if (defined('SECRET_KEY')) {
                try {
                    // Verify the JWT token and decode the payload
                    $decoded_token = JWT::decode($jwt, SECRET_KEY, ['HS256']);
                    $user_id = $decoded_token->sub;
                    $user_role = $decoded_token->role;

                    // Check if the user has the required role
                    if (
                        $user_role === 'مدير المعمل' ||
                        $user_role === 'إداري'
                    ) {
                        // Only users with the role "مدير معمل" or "إداري" can add cases
                        $name = $_POST['name'];
                        $phone = $_POST['phone'];
                        $address = $_POST['address'];
                        $SSN = $_POST['SSN'];
                        $lab_name = $_POST['lab_name'];
                       
                        $target_dir = 'E:\REACT\React-PHP\uploads/';
                        $target_file =
                            $target_dir . basename($_FILES['file']['name']);
                        $content = file_get_contents(
                            $_FILES['file']['tmp_name']
                        );
                        if (isset($_POST['result'])) {
                            // The "result" field is included in the POST request body
                            $result = $_POST['result'];
                          } else {
                            // The "result" field is not included in the POST request body
                            $result = null;
                          }
                        $uploadOk = 1;
                        $imageFileType = strtolower(
                            pathinfo($target_file, PATHINFO_EXTENSION)
                        );
                        if ($uploadOk == 0) {
                            $response = [
                                'status' => 0,
                                'message' => 'File upload failed.',
                            ];
                        } else {
                            if (
                                move_uploaded_file(
                                    $_FILES['file']['tmp_name'],
                                    $target_file
                                )
                            ) {
                                $sql =
                                    'INSERT INTO cases (name, phone, address, SSN, lab_name, user_id, file, content, result ) VALUES (:name, :phone, :address, :SSN, :lab_name, :user_id, :file ,:content,:result)';
                                $stmt = $conn->prepare($sql);
                                $stmt->bindParam(':name', $name);
                                $stmt->bindParam(':phone', $phone);
                                $stmt->bindParam(':address', $address);
                                $stmt->bindParam(':SSN', $SSN);
                                $stmt->bindParam(':lab_name', $lab_name);
                                $stmt->bindParam(':user_id', $user_id);
                                $stmt->bindParam(':file', $target_file);
                                $stmt->bindParam(':content', $content);
                                $stmt->bindParam(':result', $result);

    
                                if ($stmt->execute()) {
                                    $response = [
                                        'status' => 1,
                                        'message' =>
                                            'Record created successfully.',
                                    ];
                                } else {
                                    $response = [
                                        'status' => 0,
                                        'message' => 'Failed to create record.',
                                    ];
                                }
                            } else {
                                $response = [
                                    'status' => 0,
                                    'message' => 'File upload failed.',
                                ];
                            }
                        }
                    } else {
                        // Return an error response if the user does not have the required role
                        $response = [
                            'status' => 0,
                            'message' => 'Not authorized.',
                        ];
                    }
                } catch (Exception $e) {
                    // Return an error response if the token is invalid
                    $response = [
                        'status' => 0,
                        'message' => 'Token is invalid: ' . $e->getMessage(),
                    ];
                }
            } else {
                // Return an error response if the secret key is not defined
                $response = [
                    'status' => 0,
                    'message' => 'Secret key is not defined.',
                ];
            }
        } else {
            // Return an error response if the JWT token is missing or has the wrong format
            $response = [
                'status' => 0,
                'message' => 'JWT token is missing or invalid.',
            ];
        }
        echo json_encode($response);
        break;
    case 'PUT':
        $user = json_decode(file_get_contents('php://input'));
        $sql =
            'UPDATE users SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id';
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if ($stmt->execute()) {
            $response = [
                'status' => 1,
                'message' => 'Record updated successfully.',
            ];
        } else {
            $response = [
                'status' => 0,
                'message' => 'Failed to update record.',
            ];
        }
        echo json_encode($response);
        break;

    case 'DELETE':
        $sql = 'DELETE FROM users WHERE id = :id';
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if ($stmt->execute()) {
            $response = [
                'status' => 1,
                'message' => 'Record deleted successfully.',
            ];
        } else {
            $response = [
                'status' => 0,
                'message' => 'Failed to delete record.',
            ];
        }
        echo json_encode($response);
        break;
}
