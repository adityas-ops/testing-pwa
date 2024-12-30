"use client "

 const commentData = [
    {
        id:1,
        autherName:"Aditya",
        comment:"This is a great article",
        date:"2021-09-01",
        time:"12:00",
        likes:0,
        replies:[
            {
                id:2,
                autherName:"Ben",
                comment:"I agree",
                date:"2021-09-01",
                time:"12:00",
                likes:0,
                replies:[]
            },
            {
                id:3,
                autherName:"Charlie",
                comment:"I disagree",
                date:"2021-09-01",
                time:"12:00",
                likes:0,
                replies:[
                    {
                        id:4,
                        autherName:"David",
                        comment:"I agree with Adi",
                        date:"2021-09-01",
                        time:"12:00",
                        likes:0,
                        replies:[]
                    }
                ]
            }
        ]
    },
    {
        id:5,
        autherName:"Eva",
        comment:"I don't know",
        date:"2021-09-01",
        time:"12:00",
        likes:0,
        replies:[
            {
                id:6,
                autherName:"Fiona",
                comment:"I agree with Eva",
                date:"2021-09-01",
                time:"12:00",
                likes:0,
                replies:[]
            },
            {
                id:7,
                autherName:"Gina",
                comment:"I disagree with Eva",
                date:"2021-09-01",
                time:"12:00",
                likes:0,
                replies:[
                    {
                        id:8,
                        autherName:"Hannah",
                        comment:"I agree with Gina",
                        date:"2021-09-01",
                        time:"12:00",
                        likes:0,
                        replies:[]
                    }
                ]
            }
        ]
    }
 ]



    export default commentData