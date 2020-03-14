<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Lab 1</title>
    <link rel="stylesheet" href="../styles/style.css">
</head>
<body>
<div class="wrapper">
    <header class="introduction">
        <p>P3210 Рябикин Илья Леонидович - Вариант 210020</p>
    </header>
    <table class="document">
        <tr>
            <td colspan="3">
                <h1>Проверка попадания точек в области графика</h1>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <img src="../images/areas.png" alt="Координатная плоскость с областями">
            </td>
        </tr>
        <tr>
            <td>
                <table id="results">
                    <tr>
                        <td>X</td>
                        <td>Y</td>
                        <td>R</td>
                        <td>Результат</td>
                        <td>Время начала работы скрипта</td>
                        <td>Время работы скрипта</td>
                    </tr>
                    <?php
                    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                        date_default_timezone_set('UTC');
                        session_start(['cookie_lifetime' => 600]);

                        $start_time = microtime(true);
                        $_SESSION['current_time'][] = time();
                        $_SESSION['x_coordinate'][] = $_GET['x_coordinate'];
                        $_SESSION['y_coordinate'][] = $_GET['y_coordinate'];
                        $_SESSION['radius'][] = $_GET['radius'];

                        if (!is_numeric(end($_SESSION['x_coordinate']))
                            || !preg_match("/^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$/", end($_SESSION['y_coordinate']))
                            || !is_numeric(end($_SESSION['radius']))
                            || end($_SESSION['y_coordinate']) < -5 || end($_SESSION['y_coordinate']) > 3
                            || end($_SESSION['x_coordinate']) < -4 || end($_SESSION['x_coordinate']) > 4
                            || end($_SESSION['radius']) < 1 || end($_SESSION['radius']) > 3) {

                            echo "<tr><td colspan='6'>Неверный формат данных!</td>";

                            array_pop($_SESSION['current_time']);
                            array_pop($_SESSION['x_coordinate']);
                            array_pop($_SESSION['y_coordinate']);
                            array_pop($_SESSION['radius']);
                        } else {
                            $_SESSION['correct'][] = (end($_SESSION['x_coordinate']) >= -end($_SESSION['radius'])
                                    && end($_SESSION['x_coordinate']) <= 0
                                    && end($_SESSION['y_coordinate']) <= sqrt(pow(end($_SESSION['radius']), 2) - pow(end($_SESSION['x_coordinate']), 2))
                                    && end($_SESSION['y_coordinate']) >= 0) ||
                                (end($_SESSION['x_coordinate']) >= -(end($_SESSION['radius']) / 2)
                                    && end($_SESSION['x_coordinate']) <= 0
                                    && end($_SESSION['y_coordinate']) >= -end($_SESSION['radius'])
                                    && end($_SESSION['y_coordinate']) <= 0) ||
                                (end($_SESSION['x_coordinate']) >= 0
                                    && end($_SESSION['x_coordinate']) <= end($_SESSION['radius'])
                                    && end($_SESSION['y_coordinate']) <= -end($_SESSION['x_coordinate']) + end($_SESSION['radius'])
                                    && end($_SESSION['y_coordinate']) >= 0);

                            $_SESSION['working_time'][] = round(microtime(true) - $start_time, 5);

                            for ($i = 0; $i < count($_SESSION['current_time']); $i++) {
                                echo '<tr><td>', $_SESSION['x_coordinate'][$i], '</td><td>', $_SESSION['y_coordinate'][$i],
                                '</td><td>', $_SESSION['radius'][$i], '</td><td>',
                                $_SESSION['correct'][$i] ? "Попадание" : "Непопадание", '</td><td>',
                                date('H:i:s j M', $_SESSION['current_time'][$i]), '</td><td>',
                                $_SESSION['working_time'][$i], ' сек</td></tr>';
                            }
                        }
                    }
                    ?>
                </table>
            </td>
        </tr>
    </table>
</div>
<footer>
    <p>Anti-patterns in action&copy;</p>
</footer>
</body>
</html>