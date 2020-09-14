import React, {Component} from "react";
import "../App.css";
import icon from "../workoutfavicon-removebg-preview.png";

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            message: '',
            embedMessage: '',
            workout: 'Workout 1',
            workouts: [
                {
                    name: 'Workout 1',
                    items: [
                        {name: 'Push Ups', amount: 10},
                        {name: 'Sit Ups', amount: 10},
                        {name: 'Squats', amount: 10},
                        ],
                    image: 'https://i.ibb.co/1L389C3/pushsitsquat.png'
                },
                {
                    name: 'Workout 2',
                    items: [
                        {name: 'Chair Dips', amount: 10},
                        {name: 'Jack Knives', amount: 10},
                        {name: 'Lunges', amount: 10},
                        ],
                    image: 'https://i.ibb.co/hMMGtZj/dipjacklunge.png'
                },
                {
                    name: 'Workout 3',
                    items: [
                        {name: 'Bicept Curls', amount: 10},
                        {name: 'Russian Twist', amount: 10},
                        {name: 'Calf Raises', amount: 10},
                        ],
                    image: 'https://i.ibb.co/vjbWGfC/Curl-Twist-Raise.png'
                }
            ],
            channel: 'https://discordapp.com/api/webhooks/743557811463651440/kVSxoxW9vAYJCyM8tfkUTlJRzbnjUAhHcoTNVuQ_ef23sc5hwImShXFr7VDiDna5vgLS',
            channels: {
                clientSuccess: {
                    link: 'https://discordapp.com/api/webhooks/743557811463651440/kVSxoxW9vAYJCyM8tfkUTlJRzbnjUAhHcoTNVuQ_ef23sc5hwImShXFr7VDiDna5vgLS',
                    inUse : true,
                },
                testGeneral: {
                    link: 'https://discordapp.com/api/webhooks/743557795369975848/hGsqPK2kSR6vK8ZXmDxEek5zOjOtcNWdJMEa_NSKg0MBJVBtKbwhFD_bn_aj4HEGF-Hz',
                    inUse : false,
                },
                testOne: {
                    link : 'https://discordapp.com/api/webhooks/743596002337882264/bwIyUtAKFKYm5-VbiVyZje3UWAIV0aegV_G5nHGaQuCTE668RXtT_-q6YkKioOScpb_I',
                    inUse : false
                }
            },
            started: false,
            sendingIn: '',
            instructionMessage: 'Click "Start Bot" to send the workout reminder every hour.',
        }
    }
    handleInput = (name, val) => {
        this.setState({[name]: val})
    }
    generateEmbedMessage = (workout) => {
        this.state.workouts.forEach((e, i) => {
            if(e.name === workout){
                let embed = {
                    author: {
                      name: "10/10/10"
                    },
                    title: "IT'S TIME!",
                    description: `Quick! Do ${e.items[0].amount} ${e.items[0].name}, ${e.items[1].amount} ${e.items[1].name}, and ${e.items[2].amount} ${e.items[2].name}!`, 
                    image:  {
                        url: e.image
                    },
                    // thumbnail: "https://i.ibb.co/9hZx5Gs/workoutfavicon.png",
                    color: this.hexToDecimal("#a700a7")
                }
                this.setState({embed})
            }
        })

        
        
    }

    componentDidMount = () =>{
        this.generateEmbedMessage(this.state.workout)
    }

    hexToDecimal = (hex) => {
        return parseInt(hex.replace("#",""), 16)
    }

    sendMessage = () => {
        var request = new XMLHttpRequest();
        request.open("POST", this.state.channel);
        request.setRequestHeader('Content-type', 'application/json');
    
        

        var params = {
          username: "Reminder",
          avatar_url: "https://i.ibb.co/9hZx5Gs/workoutfavicon.png",
          content: this.state.message,
          embeds: [
              this.state.embed
          ]
        }
    
        request.send(JSON.stringify(params));
    }

    startInterval = () => {
        this.setState({started: true})
        this.setState({int: setInterval(()=>{
            let date = new Date();
            let m = +date.getMinutes();
            if(m === 0){
                this.sendMessage();
            }
            setTimeout(() => {
                this.setState({sendingIn: (60 - m)})
                console.log(m)
            }, 500)
            this.setState({instructionMessage: 'Bot Started!'})
        }, 60000)})
        console.log(this.state.int)
    }
    stopInterval = () => {
        this.setState({instructionMessage: 'Bot Stopped.'})
        this.setState({started: false})
        clearInterval(this.state.int)
        setTimeout(() => {
            this.setState({instructionMessage: 'Click "Start Bot" to send the workout reminder every hour.'})
        }, 3000)
        console.log(this.state.int)
    }


    render(){
        let chan = Object.keys(this.state.channels).map((e, i)=>{
            if(this.state.channels[e].inUse){
                return(
                    <option key={i} value={e}>{e}</option>
                )
            } else {
                return(
                    null
                )
            }
        });
        let workoutOptions = this.state.workouts.map((e, i) =>{
            return(
                <option key={i} value={e.name}>{e.name}</option>
            )
        })
        let workoutDetails = this.state.workouts.map((e, i) => {
            if(e.name === this.state.workout){
                return(
                    <div key={i}>
                        <p>{e.items[0].name}</p>
                        <p>{e.items[1].name}</p>
                        <p>{e.items[2].name}</p>
                    </div>
                )
            } else {
                return(
                    null
                )
            }
        })
        return(
            <div className="container">
                <div className='header'>
                    <img src={icon} alt='Workout Icon' width='50px'/>
                    <h2>Workout Bot</h2>
                </div>
                <div className='column'>
                    <h4>Create Message</h4>
                    <p>To:&nbsp; 
                        <select onChange={(e)=> {
                            this.setState({channel: this.state.channels[e.target.value].link})
                            console.log(`${e.target.value}: ${this.state.channel}`)
                            }}>
                            {chan}
                        </select>
                    </p>
                    <p>Workout:&nbsp; 
                        <select onChange={(e)=> {
                            this.setState({workout: e.target.value})
                            this.generateEmbedMessage(e.target.value);
                            }}>
                            {workoutOptions}
                        </select>
                    </p>
                    {workoutDetails}
                    <span>
                        <button className="green" onClick={()=> this.startInterval()} >Start Bot</button>
                        <button className="red" onClick={()=> this.stopInterval()} >Stop Bot</button>
                    </span>
                </div>
                <div className='column'>
                    <p>{this.state.instructionMessage}</p>
                    {this.state.started ? this.state.sendingIn ? <p>Sending Message in {this.state.sendingIn} minutes</p> : <p>Calculating when the bot will send the message...</p> : null}
                </div>
            </div>
        )
    }   
}