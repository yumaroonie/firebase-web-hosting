# firebase-web-hosting

READ ME !

Firebase Configuration and Initialization:

The firebaseConfig object contains keys and identifiers specific to my Firebase project.
The Firebase application is initialized using initializeApp(firebaseConfig).
The Firestore database instance is created with getFirestore(app).


Firestore Database Structure:

The scores are stored in a Firestore collection named "scores".
Each score document within the "scores" collection contains the player's initials and their score.


Saving Scores:

When the game is reset, and if it is not the initial load, players can input their initials.
The saveScore function is called with the player's initials and the scores of both players.
A new document is added to the "scores" collection in Firestore with the player's initials, their score, and a timestamp indicating when the score was saved.


Retrieving and Displaying Scores:

The retrieveTopScores function is used to fetch the top scores from Firestore -- the definition of "top" scores is described on the scoreboard.html webpage itself (beneath the scoreboard).
It creates a query against the "scores" collection, ordering the results by the score in descending order and limiting the results to the top 10 scores.
This query is executed asynchronously using getDocs(scoresQuery), which retrieves the documents that match the query.
The retrieved documents are then mapped to an array of objects containing the initials and scores, which is returned by the function.


Integration with HTML:

In the scoreboard.html file, the retrieveTopScores function is imported from the game.js module.
The displayScores function is defined to call retrieveTopScores and populate the scoresList div with the fetched scores.
This function uses JavaScript's template literals to create HTML strings representing each score, which are then inserted into the page's DOM, allowing the top scores to be displayed on the scoreboard.
The real-time nature of Firestore ensures that any updates to the scores are quickly reflected in the scoreboard, providing an up-to-date leaderboard for players.