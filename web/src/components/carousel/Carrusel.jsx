import React, { Component } from 'react'
import {Carousel} from 'react-bootstrap';
import './carrusel.css';

export class Carrusel extends Component {
  
    render() {
        const photos = this.props.images;
        console.log(photos);
        return (
            <div>
                <Carousel fade style={{height:"100%"}}>
                    {
                            photos.map((photo,index)=>
                                <Carousel.Item interval={4000} key={index} style={{
                                    backgroundImage:`url(${photo})`,
                                    backgroundSize:"cover",
                                    backgroundRepeat:"no-repeat",
                                    backgroundPosition:"center",
                                    height:"100%"
                                }}>
                                    
                                </Carousel.Item>
                            )
                        }
                    
                    
                </Carousel>
            </div>
        )
    }
}

export default Carrusel;
