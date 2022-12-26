INSERT INTO
    department (id, department_name)
VALUES
    (1, 'Marketing'),
    (2, 'Graphic Design'),
    (3, 'Customer Service'),
    (4, 'Human Resources'),
    (5, 'Management');

INSERT INTO
    role (
        id,
        job_title,
        salary,
        department_name
    )
VALUES
    (
        1,
        'Social Media Manager',
        60000,
        'Marketing'
    ),
    (
        2,
        'Graphic Designer',
        80000,
        'Graphic Design'
    ),
    (
        3,
        'CSR',
        30000,
        'Customer Service'
    ),
    (
        14,
        'HR Manager',
        0000,
        'Human Resources'
    );

INSERT INTO
    employee (
        id,
        first_name,
        last_name,
        job_title,
        department_name,
        salary,
        manager_id
    )
VALUES
    (
        1,
        'Shel',
        'Cloyd',
        'Graphic Designer',
        'Graphic Design',
        80000,
        5
    ),
    (
        2,
        'Kyle',
        'Biem',
        'Social Media Manager',
        'Marketing',
        60000,
        5
    );