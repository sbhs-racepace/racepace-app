let header = new Headers()
header.set('Cache-Control', 'no-cache, no-store, must-revalidate')
header.set('Pragma', 'no-cache');
header.set('Expires', '0');

export default header;