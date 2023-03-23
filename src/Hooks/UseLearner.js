import { useEffect, useState } from "react"

const useLearner = email =>{
    const [isLearner, setIsLearner] = useState(false);
    const [isLearnerLoading, setIsLearnerLoading] = useState(true)

    useEffect(()=>{

        
        if(email){
            fetch(`http://localhost:5000/users/learner/${email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
              })
            .then(res => res.json())
            .then(data => {
            //    console.log(data)
                setIsLearner(data.isLearner);
           
                setIsLearnerLoading(false);
            });
        }
    },[email])
    return [isLearner, isLearnerLoading]
}

export default useLearner;