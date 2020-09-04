export function load_page( e ) {
  ( e || window.event ).preventDefault();

  fetch( "http://10.42.0.41/pages/home.html" /*, options */ )
    .then( ( response ) => response.text() )
    .then( ( html ) => {
      document.getElementById( "content" ).innerHTML = html;
    } )
    .catch( ( error ) => {
      console.warn( error );
    } );
}