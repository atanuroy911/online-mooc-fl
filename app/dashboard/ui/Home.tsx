import { useEffect, useState } from "react";
import { Card, CardContent, CircularProgress, Typography, Grid } from "@mui/material"; // Import Material-UI components
import CircularProgressBarCard from "../chart/circularChart";
import { toast } from "react-toastify";

const Home = ({ session }: { session: any }) => {
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        fetch(`/api/mycourses?id=${session?.user?.email}`)
            .then(response => response.json())
            .then(data => {
                setFilteredCourses(data);
                setLoading(false); // Update loading state after data is fetched
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                toast.error("Failed to fetch courses. Please try again later.");
                setLoading(false); // Update loading state in case of error
            });
    }, [session]); // Ensure useEffect runs when session changes

    return (
        <div className="container">
            {/* Conditional rendering of circular loader */}
            {loading ? (
                <div className="w-full center loader-container">
                    <CircularProgress size={60} /> {/* Size can be adjusted as needed */}
                </div>
            ) : (
                <Grid container spacing={3}>
                    {filteredCourses.map((course: any) => (
                        <Grid item key={course.id} xs={12} sm={6} md={4}>
                            <Card className="course-card">
                                {/* Circular progress bar card */}
                                <div className="progress-bar-card">
                                    <CircularProgressBarCard title={course.courseId} percentage={101} />
                                </div>
                                {/* Course details */}
                                <CardContent>
                                    <Typography variant="h5" component="h2">{course.name}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Department: {course.department}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Content: {course.content}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Objectives: {course.learning_objectives}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Credits: {course.credits}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Duration: {course.duration}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    {/* Notice card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="notice-card">
                            <CardContent>
                                <Typography variant="h5" component="h2">Notice</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">Check your progress on 'My Courses' Page</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default Home;
