<script>
	import { isDarkTheme } from '$lib/stores/darkTheme';
	import { Temporal } from '@js-temporal/polyfill';

	const LUNAR_MONTH = 29.530588853;

	const getJulianDate = (date = new Date()) => {
		const time = date.getTime();
		const tzoffset = date.getTimezoneOffset();

		return time / 86400000 - tzoffset / 1440 + 2440587.5;
	};

	const getLunarAgePercent = (date = new Date()) => {
		const normalize = (value) => {
			value = value - Math.floor(value);
			if (value < 0) value = value + 1;
			return value;
		};
		return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
	};

	const getLunarAge = (date = new Date()) => {
		const percent = getLunarAgePercent(date);
		const age = percent * LUNAR_MONTH;
		return age;
	};

	const getLunarPhase = (date = new Date()) => {
		const age = getLunarAge(date);
		if (age < 1.84566) return 'New';
		else if (age < 5.53699) return 'Waxing Crescent';
		else if (age < 9.22831) return 'First Quarter';
		else if (age < 12.91963) return 'Waxing Gibbous';
		else if (age < 16.61096) return 'Full';
		else if (age < 20.30228) return 'Waning Gibbous';
		else if (age < 23.99361) return 'Last Quarter';
		else if (age < 27.68493) return 'Waning Crescent';
		return 'New';
	};

	const getLunarPhaseEmoji = (date = new Date()) => {
		const phase = getLunarPhase(date);
		const lunarEmojiMap = {
			New: '🌑',
			'Waxing Crescent': '🌒',
			'First Quarter': '🌓',
			'Waxing Gibbous': '🌔',
			Full: '🌕',
			'Waning Gibbous': '🌖',
			'Last Quarter': '🌗',
			'Waning Crescent': '🌘'
		};

		return lunarEmojiMap[phase];
	};

	const getDaytimeEmoji = () => {
		const currentUTCHour = Temporal.Now.plainTimeISO('UTC').hour

		if (currentUTCHour < 8) return '🌏'
		else if (currentUTCHour < 16) return '🌍'
		return '🌎'
	}

	const getTwemojiUrl = (emoji) => `https://twemoji.maxcdn.com/v/latest/svg/${emoji.codePointAt(0).toString(16)}.svg`


	let lunarPhaseTwemojiURL = getTwemojiUrl(getLunarPhaseEmoji())

	let sunTwemojiURL = getTwemojiUrl('☀️')

	let earthTwemojiURL = getTwemojiUrl(getDaytimeEmoji())

	
</script>

<label class="toggle" class:dark={$isDarkTheme}>
	<img src={lunarPhaseTwemojiURL} alt="moon" class="moon"/>
	<img src={sunTwemojiURL} alt="sun" class="sun"/>
	<input type="checkbox" class="bubble" bind:checked={$isDarkTheme} />
	<div class="a">a</div>
</label>

<style>
	.toggle {
		--circle-radius: 60px;
		--gap: 6px;
		position: relative;
		width: calc(2 * var(--circle-radius) + 2 * var(--gap));
		height: calc(var(--circle-radius) + 2 * var(--gap));
		background: var(--primary-color);
		cursor: pointer;
		border-radius: calc(var(--circle-radius) + var(--gap));
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		user-select: none;
	}

	.toggle .bubble {
		-webkit-appearance: none;
		appearance: none;
	}

	.earth {
		position: absolute;
		width: var(--circle-radius);
		top: var(--gap);
		left: var(--gap);
		transition: 0.3s ease;
	}

	.bubble:checked + .earth  {
		transform: translateX(var(--circle-radius));
	}

	.a {
		display: block;
		position: absolute;
		width: var(--circle-radius);
		top: var(--gap);
		left: var(--gap);
		transition: 0.3s ease;
	}

	.bubble:checked ~ .a  {
		transform: translateX(var(--circle-radius));
	}


	.sun,
	.moon {
		position: absolute;
		width: var(--circle-radius);
		top: var(--gap);
		transform: scale(0.8)
	}

	.sun {
		right: var(--gap);
	}

	.moon {
		left: var(--gap);
	}
</style>
