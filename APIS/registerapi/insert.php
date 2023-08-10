<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$data = json_decode(file_get_contents('php://input'));
$name = $data->name;
$email = $data->email;
$password = $data->password;
$SSN = $data->SSN;
$role = $data->role;

$con = mysqli_connect('localhost:3306', 'root', '');
if (!$con) {
    die('Could not connect to database: ' . mysqli_connect_error());
}

mysqli_select_db($con, 'gp_database');

// Check if the user already exists in the database
$check_query = "SELECT * FROM users WHERE SSN=?";
$stmt = mysqli_prepare($con, $check_query);
mysqli_stmt_bind_param($stmt, 's', $SSN);
mysqli_stmt_execute($stmt);
$check_result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($check_result) > 0) {
    // User already exists in the database
    $response= [
        'status' => 'Invalid',
        'message' => 'هذا المستخدم موجود بالفعل',
    ];
    echo json_encode($response);
} else {
    // Insert the user into the database
    $insert_query = "INSERT INTO users (name, email, password, SSN, role) VALUES (?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($con, $insert_query);
    mysqli_stmt_bind_param($stmt, 'sssss', $name, $email, $password, $SSN, $role);
    $insert_result = mysqli_stmt_execute($stmt);

    if ($insert_result) {
        $response = [
            'status' => 'valid',
            'message' => 'تمت الاضافه بنجاح',
        ];
        echo json_encode($response);
    } else {
        $response = [
            'status' => 'Invalid',
            'message' => 'خطأ أثناء الاضافه',
        ];
        echo json_encode($response);
    }
}
?>

