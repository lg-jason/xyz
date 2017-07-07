<?php

/**
 * Enqueue scripts and styles.
 */
function xyz_scripts_styles() {
	// styles. Maybe register them first, not sure yet.
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
	wp_enqueue_style( 'xyz-style', get_stylesheet_uri() );
	// wp_enqueue_style( 'wpb-google-fonts', 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i', false );

	// Register Scripts
	wp_register_script( 'bootstrapjs', get_stylesheet_directory_uri() . "/js/bootstrap.min.js", array('jquery'), '3.3.7', true );
	wp_register_script( 'slick-carousel', get_stylesheet_directory_uri() . "/js/slick.min.js", array('jquery'), '1.6', true );
	wp_register_script( 'xyz-js', get_stylesheet_directory_uri() . "/js/xyz-main.js", array('jquery'), false, true );

	// Enqueue scripts. Only load what script(s) are needed. Conditional statement if wish.
	wp_enqueue_script( 'bootstrapjs' );
	wp_enqueue_script( 'xyz-js' );
	// wp_enqueue_script( 'slick-carousel' );

}
add_action( 'wp_enqueue_scripts', 'xyz_scripts_styles' );


?>