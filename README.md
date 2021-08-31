# breathingApp
API's:
authentication:(method: POST)
  1. signup: /api/users/signup --onSuccess(201), onExistingUser(409) --body({name, email, password, passwordConfirm})
  2. login: /api/users/login --onSuccess(200), onInvalidCredentials(401) --body({email, password})
  3. forgotpassword: /api/users/forgotPassword  --pending
  
userspecific:
  1. /api/users/addUserMood --onSuccess(200), method(post), requirements (user_id: user_id, mood: Amazing or Happy or Okay or Confused or Sad)

meditation:
  1. all tracks of meditation: /api/meditation/allMeditationTracks -- onSuccess(200), onError(400) --(method: GET) 
  2. get trackurl and desc -- /api/meditation/getMeditationTrack/:track_id -- onSuccess(200), onError(400) --(method: GET)
  3. (user specific) add track to favorite: /api/meditation/addMeditationFavorite/ -- onSuccess(201) -- (method: POST), body(user_id= user_id, track_id= track_id)
  4. (user specific) get all user favorite tracks: /api/meditation/getMeditationFavorite/:user_id -- onSuccess(200) -- (method: GET)
  5. (user specific) remove a track from favorite: /api/meditation/removeMeditationFavorite/ -- onSuccess(202) -- (method: POST), body(user_id= user_id, track_id= track_id)
  
sleep:
  1. all tracks of sleep: /api/sleep/allSleepTracks -- onSuccess(200), onError(400) --(method: GET) 
  2. get trackurl and desc -- /api/sleep/getSleepTrack/:track_id -- onSuccess(200), onError(400) --(method: GET)
  3. (user specific) add track to favorite: /api/sleep/addSleepFavorite/ -- onSuccess(200) -- (method: POST), requirements(user_id= user_i, track_id= track_id)
  4. (user specific) get all user favorite tracks: /api/sleep/getSleepFavorite/:user_id -- onSuccess(200) -- (method: GET)
  5. (user specific) remove a track from favorite: /api/sleep/removeSleepFavorite/ -- onSuccess(202) -- (method: POST), body(user_id= user_id, track_id= track_id)
  
relax:
  1. all tracks of relax: /api/relax/allRelaxTracks -- onSuccess(200), onError(400) --(method: GET) 
  2. get trackurl and desc -- /api/relax/getRelaxTrack/:track_id -- onSuccess(200), onError(400) --(method: GET)
  3. (user specific) add track to favorite: /api/relax/addRelaxFavorite/ -- onSuccess(200) -- (method: POST), requirements(user_id= user_i, track_id= track_id)
  4. (user specific) get all user favorite tracks: /api/relax/getRelaxFavorite/:user_id -- onSuccess(200) -- (method: GET)
  5. (user specific) remove a track from favorite: /api/relax/removeRelaxFavorite/ -- onSuccess(202) -- (method: POST), body(user_id= user_id, track_id= track_id)
  6. fetching all sounds of relax -- /api/relax/allRelaxMelodySounds --(method: GET), response(title, track_url)


-----------ignore------------------
ref ID's:
section-

  1. Meditation: 6117d4f8b2531566f87ebf94
  2. Sleep: 6117d64fb2531566f87ebf95
  3. Relax: 6117d6eeb2531566f87ebf96


category:

  1. Meditation-
    1. Beginners: 6117dbafe2468d2e402abbb2
    2. Stress: 6117dbe5e2468d2e402abbb3

  2. Sleep-
    1. Music: 6117dd47e2468d2e402abbb6
    2. Stories: 6117dcf8e2468d2e402abbb5
    3. Mysterious: 6117dd61e2468d2e402abbb7

  3. Relax-
    1. Beginners: 6117dda2e2468d2e402abbb8
    2. Self-Calm: 6117ddb0e2468d2e402abbb9
