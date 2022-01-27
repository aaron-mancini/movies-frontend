import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import { Button, Carousel, CarouselItem } from "reactstrap";
import "react-slideshow-image/dist/styles.css"


const Home = () => {
    const { currentUser } = useContext(UserContext);
    const [animating, setAnimating] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        {src:
            "https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg"
        },
        {src:
            "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg"
        },
        {src:
            "https://m.media-amazon.com/images/M/MV5BMzQ5ZDZhZDItZTNmZi00MWQ0LWJlNDUtZTE4ZWJmODNlM2Y3XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg"
        },
        {src:
            "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
        },
        {src:
            "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg"
        }
    ]

    const itemLength = items.length - 1;
   
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ?
            itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    
    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemLength ?
            0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const carouselItemData = items.map((item) => {
        return (
            <CarouselItem
                key={item.src}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
            >
                <img src={item.src} alt="poster" />
            </CarouselItem>
        );
    });

    if (currentUser) {
        return (
            <div className="container pt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col">
                        
                            <Carousel
                                activeIndex={activeIndex}
                                next={nextButton}
                                previous={previousButton}
                                ride={"carousel"}
                                pause={false}
                                >
                                {carouselItemData}
                            </Carousel>
                                    
                    </div>
                    <div className="col d-flex align-items-center">
                        <div>
                            <div className="justify-content-center d-md-flex d-lg-flex">
                                <h1 className="text-center">Welcome back {currentUser.username}!</h1>
                            </div>                                              
                        </div>
                    </div>
                </div>    
            </div>
        )
    } else {
        return (
            <div className="container pt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col">
                        
                            <Carousel
                                activeIndex={activeIndex}
                                next={nextButton}
                                previous={previousButton}
                                ride={"carousel"}
                                pause={false}
                                >
                                {carouselItemData}
                            </Carousel>
                        
                    </div>
                    <div className="col d-flex align-items-center">
                        <div>
                            <div className="justify-content-center d-md-flex d-lg-flex">
                                <h1 className="text-center">Welcome to FilmRate</h1>
                            </div>                        
                            <div className="d-flex justify-content-center">                       
                                <h6 className="text-center">Sign up to create your own film reviews!</h6>
                            </div> 
                            <div className="d-flex justify-content-center">
                                <h6 className="text-center">Or start searching for your favorite film now!</h6>
                            </div> 
                            <div className="d-flex justify-content-center">
                                <Button className="mt-4" href="/signup" color="primary">Signup</Button>
                            </div>                       
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
    
}

export default Home;