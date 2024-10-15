# until pg_isready -h db -p 5432; do
#   echo "Waiting for PostgreSQL to be ready..."
#   sleep 3
# done

python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8002