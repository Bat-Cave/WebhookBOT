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
            channel: 'https://discordapp.com/api/webhooks/743557795369975848/hGsqPK2kSR6vK8ZXmDxEek5zOjOtcNWdJMEa_NSKg0MBJVBtKbwhFD_bn_aj4HEGF-Hz',
            channels: {
                testGeneral: 'https://discordapp.com/api/webhooks/743557795369975848/hGsqPK2kSR6vK8ZXmDxEek5zOjOtcNWdJMEa_NSKg0MBJVBtKbwhFD_bn_aj4HEGF-Hz',
                testOne: 'https://discordapp.com/api/webhooks/743596002337882264/bwIyUtAKFKYm5-VbiVyZje3UWAIV0aegV_G5nHGaQuCTE668RXtT_-q6YkKioOScpb_I',
                clientSuccess: 'https://discordapp.com/api/webhooks/743557811463651440/kVSxoxW9vAYJCyM8tfkUTlJRzbnjUAhHcoTNVuQ_ef23sc5hwImShXFr7VDiDna5vgLS',
            }
        }
    }
    handleInput = (name, val) => {
        this.setState({[name]: val})
    }
    generateEmbedMessage = (workout) => {
        this.state.workouts.forEach((e, i) => {
            if(e.name === workout){
                console.log(e.image)
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
        this.setState({int: setInterval(()=>{
            let date = new Date();
            let m = +date.getMinutes();
            if(m === 0){
                this.sendMessage();
            }
            console.log(m)
        }, 60000)})
        console.log(this.state.int)
    }
    stopInterval = () => {
        clearInterval(this.state.int)
        console.log(this.state.int)
    }


    render(){
        let chan = Object.keys(this.state.channels).map((e, i)=>{
            return(
                <option key={i} value={e}>{e}</option>
            )
        });
        let workoutOptions = this.state.workouts.map((e, i) =>{
            return(
                <option key={i} value={e.name}>{e.name}</option>
            )
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
                            this.setState({channel: this.state.channels[e.target.value]})
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
                    <textarea id="message" name="message" rows="4" cols="50" placeholder="Message..." onChange={(e) => this.handleInput('message', e.target.value)}></textarea>
                </div>
                <div className='row'>
                    <p>Send Now:</p>
                    <button onClick={()=> this.sendMessage()}>Send</button>
                </div>
                <div className="row">
                    <p>Send Every Hour on the Dot: </p>
                    <button className="green" onClick={()=> this.startInterval()} >Start Interval</button>
                    <button className="red" onClick={()=> this.stopInterval()} >Stop Interval</button>
                </div>
            </div>
        )
    }   
}