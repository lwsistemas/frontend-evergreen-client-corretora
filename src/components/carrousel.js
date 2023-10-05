
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export default () => (


    <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showStatus={false}
        width="50%"
        showThumbs={false}
        interval="5000"
        renderIndicator={(onClickHandler, isSelected, index, label) => {
        }
        }
    >


        <div style={{marginBottom:'55px', paddingBottom:'55px'}}>

            <div>
                <a href='#'>
                    <img alt="" src="https://zapmarketing.site/wp-content/uploads/2023/04/tela_envio-1024x607.png" />
                    <legend>Banner</legend>
                </a>
            </div>

        </div>



    </Carousel>
);