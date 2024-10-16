import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import vector from '../Assets/Vector.png';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [successfulSave, setSuccessfulSave] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      console.log('User is logged in:', storedUser);
      setUser(storedUser);
    }
    setLoading(false); // Set loading to false once user is loaded
  }, []);

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };

  const handleCancelClick = () => {
    setShowCancelPopup(true);
  };

  const handleCancelPopupClose = (confirm) => {
    if (confirm) {
      // Yes clicked, reload the page
      window.location.reload();
    }
    setShowCancelPopup(false);
  };

  const handleSaveChangesClick = () => {
    setShowSavePopup(true);
  };

  const handleSaveChangesConfirm = async (confirm) => {
    if (confirm) {
      if (newPassword !== confirmPassword) {
        alert('New passwords do not match.');
        return;
      }

      const userUpdateData = {
        firstname: user.firstname,
        lastname: user.lastname,
        password: newPassword,
      };
  
      try {
        const response = await fetch(`http://localhost:8080/user/modifyStudentProfile?userID=${user.userID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            passedCurrentPassword: currentPassword,
            userUpdateData,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save changes.');
        }
  
        // Fetch the updated user data
        //const updatedUserResponse = await fetch(`http://localhost:8080/user/getStudent?userID=${user.userID}`);
        // if (!updatedUserResponse.ok) {
        //   throw new Error('Failed to fetch updated user data.');
        // }
        // const updatedUserData = await updatedUserResponse.json();
  
        // Update localStorage with new user data
        //localStorage.setItem('user', JSON.stringify(updatedUserData));
  
        alert('Profile updated successfully.');
        window.location.reload();
        //setUser(updatedUserData); // Update state with new user data

      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving changes.');
      }
    } else {
      setShowSavePopup(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  if (!user) {
    return <div>No user data found.</div>; // Handle case where user is null
  }
  return (
    <div className="m-0 vh-100"
      style={{
        background: '#FCFFF8',
        color: '#333333',
        backgroundImage: `url(${vector})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>

      {/* Main container with white background and rounded corners */}
      <div className="container p-5"
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: '85%',
          position: 'relative',
          top: '100px',
        }}>
        <h2>Personal Information</h2>

        <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
          {/* Profile Picture */}
          <div className="row mb-4">
            <div className="col-md-6 mb-4 mt-5">
              <img
                src={user.profilePicture || 'https://placehold.co/100x100'}
                alt={`${user.firstname}'s profile`}
                className="img-fluid rounded-circle"
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            <div className="col-md-6 mb-5 mt-5" style={{ textAlign: 'right' }}>
              <button
                style={{
                  borderRadius: '8px',
                  width: '93px',
                  height: '37px',
                  backgroundColor: '#B9FF66',
                  border: 'none',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#B9FF66'}
                onClick={handleEditClick} // Handle Edit click
              >
                Edit
              </button>
            </div>
          </div>

          {/* Two columns for First Name and Last Name */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                value={user.firstname}
                readOnly={!editable}
                onChange={(e) => setUser(prev => ({ ...prev, firstname: e.target.value }))}
                className="form-control"
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                value={user.lastname}
                readOnly={!editable}
                onChange={(e) => setUser(prev => ({ ...prev, lastname: e.target.value }))}
                className="form-control"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label className="form-label">Email Address</label>
            <input
              type="text"
              value={user.username}
              readOnly={true} // Email remains uneditable
              className="form-control"
              style={{ borderRadius: '8px' }}
            />
          </div>

          {/* Change Password Button */}
          {editable && !showChangePassword && (
            <div style={{ textAlign: 'left' }}>
              <button
                onClick={handleChangePasswordClick}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'black',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'lightgray'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
              >
                Change Password
              </button>
            </div>
          )}

          {/* Change Password Fields */}
          {showChangePassword && (
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '8px' }}
                />
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cancel and Save Changes Buttons */}
        {editable && (
          <div style={{ textAlign: 'right' }}>
            <button
              onClick={handleCancelClick}
              style={{
                borderRadius: '8px',
                width: '130px',
                height: '37px',
                backgroundColor: 'white',
                borderColor: 'lightGray',
                transition: 'background-color 0.3s ease',
                marginRight: '20px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'lightGray'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChangesClick}
              style={{
                borderRadius: '8px',
                width: '130px',
                height: '37px',
                backgroundColor: '#B9FF66',
                border: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#B9FF66'}
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Cancel Popup */}
        {showCancelPopup && (
          <div
            style={{
              display: 'block',
              position: 'fixed',
              zIndex: 1050,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'auto',
              display: 'flex', // Use flexbox to center content
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                padding: '20px',
                paddingTop: '30px', paddingBottom: '30px',
                width: '400px', // adjust width as needed
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center'
              }}
            >
              <p>Are you sure? <br />Changes will not be saved.</p>
              <button
                style={{
                  borderRadius: '5px',
                  width: '80px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                  marginRight: '80px',
                  marginTop: '20px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => handleCancelPopupClose(false)}>Cancel</button>
              <button
                style={{
                  borderRadius: '5px',
                  width: '80px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => handleCancelPopupClose(true)}>Yes</button>
            </div>
          </div>
        )}

        {/* Save Changes Popup */}
        {showSavePopup && (
          <div
            style={{
              display: 'block',
              position: 'fixed',
              zIndex: 1050,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'auto',
              display: 'flex', // Use flexbox to center content
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                padding: '20px',
                paddingTop: '30px', paddingBottom: '30px',
                width: '400px', // adjust width as needed
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center'
              }}
            >
              <h5>Confirm Changes</h5>
              <p>Are you sure you want to save these changes?</p>
              <button
                style={{
                  borderRadius: '5px',
                  width: '150px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                  marginRight: '40px',
                  marginTop: '20px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => handleSaveChangesConfirm(false)}>Continue Editing</button>
              <button
                style={{
                  borderRadius: '5px',
                  width: '80px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                  marginTop: '20px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => handleSaveChangesConfirm(true)}>Yes</button>
            </div>
          </div>
        )}



        {/* Success or Error Message After Save */}
        {successfulSave !== null && (
          <div>
            <h5>{successfulSave ? "Changes saved successfully!" : "Failed to save changes."}</h5>
          </div>
        )}
      </div>
    </div>
  );
}

