import React, { useState } from 'react';

const LearningManagement = () => {
  const [course] = useState({ title: 'Sample Course' });

  const handleCreate = () => {
    const notification = {
      title: 'Course Created',
      message: `${course.title} has been created successfully`,
      timestamp: new Date().toISOString()
    };
    console.log(notification);
  };

  return (
    <div>
      <h1>Learning Management</h1>
      <button onClick={handleCreate}>Create Course</button>
    </div>
  );
};

export default LearningManagement;