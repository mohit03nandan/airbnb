const emailformat = ({name,description,location,price}) =>{
  const text =   `Dear Admin,

    Your new property listing has been successfully created in our system.

    Here are the details:
    - Name: ${name}
    - Description: ${description}
    - Location: ${location}
    - Price: ₹${price} per day

    Thank you for adding your listing. If you need to make changes, please log in to your dashboard.

    Best regards,
    Airbnb Team`
    return text
}

module.exports = {emailformat}