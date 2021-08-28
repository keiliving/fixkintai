const Header:Headers = new Headers(
  {
    'Content-Type': 'text/xml'
}
);

var Init = { 
  method: 'POST',
  headers: Header,
  body: "sss"
};

function requestLogin() {
  const request = new Request('hoge', Init);

}

export default requestLogin;