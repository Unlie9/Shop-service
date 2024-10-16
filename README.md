# Shop-service

### Description
Shop service with notifications and custom admin panel

# Admin data
### email: admin@gmail.com
### password: admin1234


# Information

- Admin has access to interact only with the admin panel
- User has access to interact with catalog and basket
- Notifications in admin panel when user registered and made order

# Futures

- **Django**: serves as the backend, handling API endpoints for product management, user authentication, and order processing.
- **React**: The frontend is built with React, providing a dynamic, responsive user interface. React communicates with the Django backend through REST API calls for handling product listings, user interactions, and shopping cart functionality.
- **Celery + Redis**: Celery, in conjunction with Redis, is used for managing background tasks such as sending order confirmation emails, processing payments, or executing any tasks that should run asynchronously, ensuring smooth performance without blocking the main application flow.
- **PostgreSQL**: is used as the primary database, offering a highly secure, reliable, and scalable solution for managing relational data, including product inventories, user accounts, and orders.
- **JWT Authentication**: User authentication is implemented using JWT (JSON Web Tokens), ensuring secure access control for registered users by generating and verifying tokens for each session.
- **WebSocket**: is integrated to send real-time notifications to administrators when new orders are placed, enabling immediate action on incoming orders and improving the admin experience.
- **Docker**: The entire project is containerized using Docker, making it easy to deploy, scale, and manage across various environments. Docker ensures consistent and portable application behavior, regardless of the infrastructure.



1. **Clone the repository**:
    ```bash
    git clone https://github.com/Unlie9/Shop-service.git
    ```
2. **Create a virtual environment**:
    ```bash
    python -m venv env
    source env/bin/activate
    ```
3. **Install dependencies**:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
    > **Note**: Dont forget for your .env file
4. **Run with Docker**:
    ```bash
    docker-compose up --build
    ```
  
