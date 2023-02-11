import React, {useState, useEffect, useRef} from 'react'

import { TestContainer } from "./../TestContainer/TestContainer";

import { typingTestData } from './../../data/source'
import { randomElementSelector } from '../../helper/randomSelector';
import './App.css';
import { testDetailsCalculator } from '../../helper/testDetailsCalculator';

import sound from '../../data/sound.mp3'




const App = () => {
	const [timerStarted, setTimerStarted] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(300);
	const [detailsData, setDetailsData] = useState({
		words: 0,
		characters: 0,
		mistakes: 0,
	});
	const [selectedParagraph, setSelectedParagraph] = useState("");
	

	const audio = new Audio(sound);


	useEffect(()=> {
		setSelectedParagraph(randomElementSelector(typingTestData))
	}, [])

	const startTimer = () => {
		setTimerStarted(true);
		
		const timer = setInterval(() => {
			setTimeRemaining(prev => {
				if(prev===0) {
					clearInterval(timer);
					setTimerStarted(false);
				}else {	
					return prev-1;
				}
			})
		}, 1000)
		
		
	}

	const handleKeyPress = (inputValue) => {
		if (!timerStarted) {
			startTimer()
		}
		audio.play();
		const updatedDetails = testDetailsCalculator(selectedParagraph, inputValue)
		//console.log('Updated Details: ', updatedDetails)
		setDetailsData(updatedDetails)
		
	}

	const startAgain = () => {
		setTimerStarted(false);
		setTimeRemaining(300);
		setDetailsData({
			words: 0,
			characters: 0,
			mistakes: 0,
		})
		setSelectedParagraph("");
		setSelectedParagraph(randomElementSelector(typingTestData))
	}


	return (
		<div className="app-container">
			<h1 className="main-heading">Precision Type</h1>
			<div className="test-container-main">
				<TestContainer
					handleKeyPress={handleKeyPress}
					timeRemaining={timeRemaining}
					timerStarted={timerStarted}
					startAgain={startAgain}
					words={detailsData.words}
					characters={detailsData.characters}
					mistakes={detailsData.mistakes}
					selectedParagraph={selectedParagraph}
				/>
				
			</div>
		</div>
	)

}


export default App;
