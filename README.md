[![Codacy Badge](https://app.codacy.com/project/badge/Grade/523f5af892e940a2ae28794301880582)](https://www.codacy.com/gh/nejdetkadir/spotify-api-usage/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nejdetkadir/spotify-api-usage&amp;utm_campaign=Badge_Grade)
# Spotify API Usage
An app that showcases how to use Spotify API with VueJS

![cover](doc/cover.gif)

# Features
- Authenticate with Spotify account
- Read user information 
- Read user's recently played
- Read current playback
- Read user's top tracks
- Skip user's playback to next/previous track
- Start/Resume a user's playback (unstable)
- Pause a user's playback
- Search for an item
- Set volume for user's playback
- Read artists and albums

![spotify for developers](doc/spotify-for-developers.jpg)
## Project setup
```
yarn install
```
### Environment variables
Create a file named ".env.local" in the root directory and fill its contents as follows. For more information about [Spotify API](https://developer.spotify.com/)
```dotenv
VUE_APP_SPOTIFY_REDIRECT_URL=XXX
VUE_APP_SPOTIFY_CLIENT_ID=XXX
VUE_APP_SPOTIFY_CLIENT_SECRET=XXX
```
### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

# LICENSE
```
MIT License

Copyright (c) 2021 Nejdet Kadir Bektaş

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
