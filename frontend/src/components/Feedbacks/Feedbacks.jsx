import React, {useEffect, useState} from 'react';
import InfiniteCarousel from './Slider';
import URL from "../../Constants/ConstantUrl";
import './Feedbacks.css'

function Feedbacks() {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        async function getFeedbacks() {
            try {
                const response = await fetch(`${URL}feedbacks`);

                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }

                const records = await response.json();
                const approvedFeedbacks = records
                    .filter(feedback => feedback.isApproved) 
                    .map(feedback => ({
                        css: 'url(./one.svg)',
                        message: feedback.comment
                    }));
                setFeedbacks(approvedFeedbacks);
                console.log(records);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            }
        }

        getFeedbacks();
    }, []);
    
    return (
        <div>
            <h3 className="mb-5 feedbacks-title">Feedbacks from our patients...</h3>
            <div className="main-container-feedbacks">
                <InfiniteCarousel items={feedbacks} itemWidth={'full'} visible={1}>
                    {({ message }, i) => (
                        <div className="content">
                            <div className="message-text" dangerouslySetInnerHTML={{ __html: `&ldquo;${message}&rdquo;` }}  />
                        </div>
                    )}
                </InfiniteCarousel>
            </div>
        </div>
    );
}

export default Feedbacks;