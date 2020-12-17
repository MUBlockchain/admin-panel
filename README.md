<p align="center">
  <a href="https://app.tor.us">
   <img alt="Gatsby" src="https://app.tor.us/v1.4.4/img/torus-logo-blue.7d2a4a6b.svg" width="180" />
  </a>
</p>
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  A starter template for Gatsby and tor.us direct auth
</h1>

[tor.us](https://docs.tor.us/) - bills itself as "authentication abstracted for the decentralized ecosystem". Give your users a smooth familiar onboarding experience by letting them sign up with google email accounts and other familiar OAuth providers.

Built and designed to be trustless, users’ identities are not controlled by any central authority, which means that your user owns the keys.

[tor.us documentation](https://docs.tor.us/)

This boilerplate allows you to get tor.us up and running with Gatsby super easily. Just follow these simple steps:

## 🚀 Quick start

1.  **Set up your Google OAUTH ID**

    First get your new GATSBY_GOOGLE_CLIENT_ID by [creating an OAuth 2.0 client ID](https://console.developers.google.com/apis/credentials) here, setting 'Authorized redirect URIs' to http://localhost/8000/serviceworker/redirect

2.  **Start developing.**

    [Go to the Torus Developer Group](https://t.me/torusdev)
    And request a custom verifier be set up, giving them your Google client id

3.  **Get the friendly torus folks to set up a custom verifier for you**

    Make a copy of .env.example called .env.development and add the values that you acquired in the first 2 steps above:
    
    GATSBY_GOOGLE_CLIENT_ID
    GATSBY_VERIFIER_NAME

    Now you're ready to go!

4.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 💫 Deploy

There is a gotcha for building at the Torus library isn't designed for server side rendering, so you need to lazy load all torus components as we have already done for src/components/login.js, otherwise you will get an error saying btoa is undefined or similar.

This should work as is... Lucky you!
