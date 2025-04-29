# app/database.py
import os
import logging
import psycopg2
from psycopg2.pool import SimpleConnectionPool
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
# hgku
# Configure logging to track SQL queries
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "pbl2")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASSWORD", "shubhk2004")

# Create a connection pool
pool = SimpleConnectionPool(
    minconn=1,
    maxconn=10,
    host=DB_HOST,
    port=DB_PORT,
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS
)

@contextmanager
def get_db_connection():
    """Get a database connection from the pool"""
    conn = None
    try:
        conn = pool.getconn()
        yield conn
    finally:
        if conn:
            pool.putconn(conn)

@contextmanager
def get_db_cursor(commit=False):
    """Get a database cursor that returns results as dictionaries"""
    with get_db_connection() as conn:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            yield cursor
            if commit:
                conn.commit()
        finally:
            cursor.close()

def execute_query(query, params=None, fetch=True, commit=True):
    """Execute a SQL query and return results"""
    with get_db_cursor(commit=commit) as cursor:
        logger.info(f"Executing query: {query} with params: {params}")
        cursor.execute(query, params or ())
        if fetch:
            return cursor.fetchall()
        return None

def execute_many(query, params_list, commit=True):
    """Execute the same query with different parameters"""
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.executemany(query, params_list)
        if commit:
            conn.commit()

# Helper functions for common database operations

def user_exists(email):
    """Check if a user with the given email exists"""
    query = "SELECT EXISTS(SELECT 1 FROM users WHERE email = %s)"
    result = execute_query(query, (email,))
    return result[0]['exists']

def get_user_by_email(email):
    """Get user data by email"""
    query = "SELECT * FROM users WHERE email = %s"
    result = execute_query(query, (email,))
    return result[0] if result else None

def get_user_by_id(user_id):
    """Get user data by ID"""
    query = "SELECT * FROM users WHERE id = %s"
    result = execute_query(query, (user_id,))
    return result[0] if result else None

def create_user(username, email, password_hash, phone="0000000000", profession=None, preferred_language="en"):
    """Create a new user in the database with all fields"""
    query = """
    INSERT INTO users (id, username, email, password_hash, phone, profession, preferred_language)
    VALUES (gen_random_uuid(), %s, %s, %s, %s, %s, %s)
    RETURNING id, username, email, phone, profession, preferred_language, created_at
    """
    return execute_query(query, (username, email, password_hash, phone, profession, preferred_language))[0]
