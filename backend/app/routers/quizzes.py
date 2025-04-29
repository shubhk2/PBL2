# app/routers/quizzes.py
from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from ..database import execute_query
from .auth import get_current_user

router = APIRouter()

@router.get("/scheduled")
async def get_scheduled_quizzes(
        sort_by: Optional[str] = "date",
        user: dict = Depends(get_current_user)
):
    # Base query with table joins to get course information
    query = """
    SELECT 
        q.id, 
        q.title, 
        q.description, 
        q.scheduled_date, 
        q.deadline_date, 
        q.total_questions,
        q.duration,
        q.status,
        uc.course_name as course
    FROM quizzes q
    JOIN user_courses uc ON q.course_id = uc.id
    WHERE uc.user_id = %s
    """

    # Apply sorting
    if sort_by == "name":
        query += " ORDER BY q.title"
    elif sort_by == "date":
        query += " ORDER BY q.scheduled_date"
    elif sort_by == "deadline":
        query += " ORDER BY q.deadline_date"

    quizzes = execute_query(query, (user["id"],))

    # Format dates to string for frontend compatibility
    for quiz in quizzes:
        if quiz["scheduled_date"]:
            quiz["scheduled_date"] = quiz["scheduled_date"].strftime("%Y-%m-%d")
        if quiz["deadline_date"]:
            quiz["deadline_date"] = quiz["deadline_date"].strftime("%Y-%m-%d")

    return {"success": True, "quizzes": quizzes}

@router.get("/{quiz_id}")
async def get_quiz_details(
        quiz_id: str,
        user: dict = Depends(get_current_user)
):
    # Check if quiz belongs to user's courses
    check_query = """
    SELECT q.id 
    FROM quizzes q
    JOIN user_courses uc ON q.course_id = uc.id
    WHERE q.id = %s AND uc.user_id = %s
    """
    result = execute_query(check_query, (quiz_id, user["id"]))

    if not result:
        raise HTTPException(status_code=404, detail="Quiz not found or access denied")

    # Get quiz details
    query = """
    SELECT 
        q.id, 
        q.title, 
        q.description, 
        q.scheduled_date, 
        q.deadline_date, 
        q.total_questions,
        q.duration,
        q.status,
        uc.course_name as course
    FROM quizzes q
    JOIN user_courses uc ON q.course_id = uc.id
    WHERE q.id = %s
    """

    quiz = execute_query(query, (quiz_id,))

    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    quiz = quiz[0]
    
    # Format dates
    if quiz["scheduled_date"]:
        quiz["scheduled_date"] = quiz["scheduled_date"].strftime("%Y-%m-%d")
    if quiz["deadline_date"]:
        quiz["deadline_date"] = quiz["deadline_date"].strftime("%Y-%m-%d")

    return {"success": True, "quiz": quiz}
