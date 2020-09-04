import './styles/styles.scss';
console.log( 'index.js ok!' )


// load_home()
load_header();


function load_home( e ) {
  e && ( e || window.event ).preventDefault();

  fetch( "http://10.42.0.61:9090/pages/home.html" /*, options */ )
    .then( ( response ) => response.text() )
    .then( ( html ) => {
      document.getElementById( "content" ).innerHTML = html;
    } )
    .catch( ( error ) => {
      console.warn( error );
    } );
}

function load_header( e ) {
  e && ( e || window.event ).preventDefault();

  fetch( "http://10.42.0.61:8080/home.html" /*, options */ )
    .then( ( response ) => response.text() )
    .then( ( html ) => {
      document.getElementById( "header-content" ).innerHTML = html;
    } )
    .catch( ( error ) => {
      console.warn( error );
    } );
}
