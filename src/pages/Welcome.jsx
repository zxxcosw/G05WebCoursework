import React from 'react'
import "./css/style.css"



const Welcome=()=>{

    return(
        <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </button>
                <h class="navbar-brand">Health Network</h>
            </div>

        </div>
    </nav>
                <div class="row">
                <div class="col-sm-10 col-md-offset-1  main">
                <span style={{width:"200px", display: "inline-block"}}></span>
                <div class="jumbotron">
                <h1 style={{paddingLeft:"50px"}}>Welcome to Health Network!</h1>
                <p style={{paddingLeft:"50px"}}>You can login to enjoy our services!</p>
                <p style={{paddingLeft:"50px"}}><a class="btn btn-primary btn-lg" href="/Login/1" role="button">Patient Login</a></p>
                <p style={{paddingLeft:"50px"}}><a class="btn btn-primary btn-lg" href="/Login/2" role="button">Practitioner Login</a></p>
                </div>

            <section class="grids_sec_2 py-5">		             
		<div class="row style-grids_main">
			<div class="col-md-6 grid_sec_info">
				<div class="style-grid-2-text_info" data-aos="fade-right">
					<h3>Our services</h3>
					<p>We provide a powerful platform to integrate services of several health practices. 
                    Patients can register to a practice for appointment booking. Practitioners can login to this system for services data management.
                    With this platform, practitioners can conduct specialist referrals with other health practice conveniently. This platform also ensure the data safefy.
                    We confirm that the privacy data will be well protected. </p>

				</div>
			</div>
			<div class="col-md-6 style-image-2"></div>
            <div class="col-md-6 style-image-2 second">
			</div>

		</div>
	</section>
                </div>
                </div>


    
            <h2 class="text-center" style={{fontWeight:"bold"}}>Find a nearest Health Practice!</h2>
            

            <div class="map">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387142.84010033106!2d-74.25819252532891!3d40.70583163828471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sin!4v1475140387172" style={{border:"0"}}></iframe>

			</div>
        </div>
    )
}

export default Welcome