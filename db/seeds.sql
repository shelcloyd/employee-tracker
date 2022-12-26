INSERT INTO department (id, department_name)
VALUES (1, 'Sales'),
    (2, 'Marketing'),
    (3, 'Graphic Design'),
    (4, 'Customer Service'),
    (5, 'Shipping'),
    (6, 'Recieving'),
    (7, 'Human Resources'),
    (8, 'Upper Management');

INSERT INTO role (id, job_title, salary, department_name)
VALUES (1, 'Sales Agent', 50000, 'Sales'),
    (2, 'Sales Manager', 80000, 'Sales'),
    (3, 'Marketing Team Member', 40000, 'Marketing'),
    (4, 'Marketing Manager', 75000, 'Marketing'),
    (5, 'Jr Graphic Designer', 40000, 'Graphic Design'),
    (6, 'Graphic Designer', 60000, 'Graphic Design'),
    (7, 'Senior Graphic Designer', 80000, 'Graphic Design'),
    (8, 'Customer Service Representative', 30000, 'Customer Service'),
    (9, 'Customer Service Manager', 45000, 'Customer Service'),
    (10, 'Shipper', 30000, 'Shipping'),
    (11, 'Shipping Manager', 45000, 'Shipping'),
    (12, 'Merchandiser', 30000, 'Recieving'),
    (13, 'Merchandising Manager', 45000, 'Recieving'),
    (14, 'Human Resourses Agent', 40000, 'Human Resources'),
    (15, 'Human Resources Manager', 60000, 'Human Resources'),
    (16, 'CEO', 150000, 'Upper Management');

    INSERT INTO employee (id, first_name, last_name, job_title, department_name, salary, manager_id)
    VALUES (1, 'Shel', 'Cloyd', 'Graphic Designer', 'Graphic Design', 60000, 7),
        (2, 'Kyle', 'Biem', 'Sales Manager', 'Sales', 80000, 16),
        (3, 'Blake', 'Whitlock', 'Shipper', 'Shipping', 30000, 11),
        (4, 'Michael', 'Burge', 'Human Resources Manager', 'Human Resources', 60000, 16),
        (5, 'Don', "O'linn", 'CEO', 'Upper Management', 150000, 0);