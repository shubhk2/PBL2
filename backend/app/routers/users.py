from fastapi import APIRouter, Depends, HTTPException
from ..database import execute_query
from .auth import get_current_user

router = APIRouter()

@router.get("/profile")
async def get_user_profile(user: dict = Depends(get_current_user)):
    """Get the current user's profile information and statistics"""
    
    # Get user's basic information
    user_query = """
    SELECT 
        id, username, email, phone as contact, preferred_language as language, 
        profession
    FROM users 
    WHERE id = %s
    """
    user_data = execute_query(user_query, (user["id"],))
    
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_profile = user_data[0]
    
    # Get course statistics
    stats_query = """
    SELECT 
        COUNT(CASE WHEN is_completed = false THEN 1 END) as courses_generated,
        COUNT(CASE WHEN is_completed = true THEN 1 END) as courses_completed
    FROM user_courses
    WHERE user_id = %s
    """
    stats = execute_query(stats_query, (user["id"],))
    
    # Get quiz statistics
    quiz_query = """
    SELECT 
        COUNT(*) as quizzes_attempted
    FROM quiz_attempts
    WHERE user_id = %s
    """
    quiz_stats = execute_query(quiz_query, (user["id"],))
    
    # Combine data
    return {
        "success": True,
        "username": user_profile.get("username", ""),
        "fullName": user_profile.get("username", ""),  # Updated to use username directly
        "email": user_profile.get("email", ""),
        "contact": user_profile.get("contact", ""),
        "language": user_profile.get("language", "en"),
        "profession": user_profile.get("profession", ""),
        "coursesGenerated": stats[0].get("courses_generated", 0) if stats else 0,
        "coursesCompleted": stats[0].get("courses_completed", 0) if stats else 0,
        "quizzesAttempted": quiz_stats[0].get("quizzes_attempted", 0) if quiz_stats else 0
    }
