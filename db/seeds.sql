-- pre-populated the database with below entries

INSERT INTO department (id, name)
VALUES (1, 'Sales'),
       (2, 'Marketing'),
       (3, 'Engineering'),
       (4, 'Finance'),
       (5, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Representative', 50000, 1),
       (2, 'Sales Manager', 80000, 1),
       (3, 'Marketing Coordinator', 45000, 2),
       (4, 'Marketing Manager', 75000, 2),
       (5, 'Software Engineer', 100000, 3);


INSERT INTO employee (id, first_name, last_name, role_id, manager)
VALUES (1, 'Aarti', 'Contractor', 2, 'David Lee'),
       (2, 'Jane', 'Doe', 2, 'Sarah Parker'),
       (3, 'Bob', 'Smith', 3, 'John Doe'),
       (4, 'Alice', 'Johnson', 4, NULL),
       (5, 'David', 'Lee', 5, NULL);