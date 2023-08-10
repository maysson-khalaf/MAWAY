<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
    
        if(isset($path[3]) && is_numeric($path[3])) {
            // Retrieve a specific case by ID
            $sql = "SELECT * FROM cases WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $cases = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            // Retrieve all cases for a specific lab name (if provided)
            $lab_name = isset($_GET['lab_name']) ? $_GET['lab_name'] : null;
            $sql = "SELECT * FROM cases";
            if($lab_name) {
                $sql .= " WHERE lab_name = :lab_name";
            }
            $stmt = $conn->prepare($sql);
            if($lab_name) {
                $stmt->bindParam(':lab_name', $lab_name);
            }
            $stmt->execute();
            $cases = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    
        echo json_encode($cases);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO cases( name, phone, address,SSN,lab_name) VALUES( :name, :phone, :address, :SSN, :lab_name )";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':phone', $user->phone);
        $stmt->bindParam(':address', $user->address);
        // $stmt->bindParam(':other_name', $user->other_name);
        $stmt->bindParam(':SSN', $user->SSN);
        $stmt->bindParam(':lab_name', $user->lab_name);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE users SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}


 
