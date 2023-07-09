# Manteam - Django/React Project

Manteam is Project Management System built with Django/React. It allows users to create workspaces, add members to it, and assign roles to them. In each workspace, the owner can create and manage projects, and add tasks to them. The project provides GitHub integration, which automatically creates a new repository when creating a new project and creates a new branch when adding a new task to the project.

## Technologies Used

### Frontend

- ReactJS
- Axios
- React Redux Tools
- React Query

### Backend

- Django Rest Framework
- Django ORM
- GitHub API
- JSON Web Token
- Authentication System
- Djoser
## Documentation

The project documentation can be found [here](https://docs.google.com/document/d/1YrgRZz3yAWDW0dyUPbPM0LJf8WqbTBbHccDnGkNKPHs/).
## Installation

1. Clone the repository:

```bash
git clone https://github.com/moustafashahin122/ManTeam-Project-Management-System-ITI-Grad-Project
```

2. Create a virtual environment and activate it:

```bash
python3 -m venv env
source env/bin/activate
```

3. Install the dependencies:

```bash
pip install -r requirements.txt

```

4. Create a PostgreSQL database and update the `DATABASES` setting in `pms/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_database_name',
        'USER': 'your_database_user',
        'PASSWORD': 'your_database_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

5. Run the migrations:

```bash
python manage.py migrate
```

6. Start the development server:

```bash
python manage.py runserver
npm run dev
```

7. Navigate to `http://localhost:5173/` in your browser.

## Usage

1. Register a new user or login with an existing account.
2. Create a new workspace or join an existing one by entering the workspace code.
3. Add members to the workspace and assign roles to them.
4. Create a new project in the workspace and add tasks to it.
5. Activate GitHub integration to automatically create a new repository and branch for the project.
6. View, edit, and delete workspaces, projects, and tasks as needed.

## License

This project is licensed under the [MIT license ↗](https://opensource.org/licenses/MIT).
