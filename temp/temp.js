const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({aadhar_no:aadhar_no})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
           console.log("console log from register.js aftewr checking with DB THE USER EXISTS")

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return(
        <div><P>hello</P></div>
    )
}
// Amazing designer updates to this beach chich home that is just a quick 3-minute stroll to Capitola Village! As you enter this light-filled home you will love the open floorplan and huge picture window with views to park.