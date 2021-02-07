import React from 'react';

/**
 * TagCloud canvas Container class
 * Generates word cloud
 */
class TagCloud extends React.Component {
    static self;
    constructor(props) {
        super(props);
        self = this;
        self.config = {
            trace: true,
            spiralResolution: 1, //Lower = better resolution
            spiralLimit: 360 * 5,
            lineHeight: 0.8,
            xWordPadding: 0,
            yWordPadding: 3,
            font: "sans-serif"
        }

        self.words = self.props.wordsFreq;
        self.wordsDown = [];
    }

    componentDidMount() {
        self.ProcessWordClouds();
    }

    componentDidUpdate() {
        self.ProcessWordClouds();
    }

    /**
     *  Process / Update / draw each words
     */
    ProcessWordClouds( ) {
        //Start the tag cloud operation if body of text is non-empty
        self.loaderRef.style.display = "block";
        this.ctx = self.canvasRef.getContext('2d');
        self.containerCloudRef.style.fontFamily = self.config.font;
        self.startPoint = {
            x: self.containerCloudRef.offsetWidth / 2,
            y: self.containerCloudRef.offsetHeight / 2
        };

        setTimeout(function () {
            self.placeWords();
            self.traceSpiral()
        }, 10);
    }

    /**
     * Create divs for each of the words and adding styles to it
     * @param word
     * @param freq
     */
    createWordObject(word, freq) {
        let wordContainer = document.createElement("div");
        wordContainer.style.position = "absolute";
        wordContainer.style.fontSize = (parseInt(freq) * 20) + "px";
        wordContainer.style.lineHeight = self.config.lineHeight;
        wordContainer.appendChild(document.createTextNode(word));

        return wordContainer;
    }

    /**
     * Placement of each words
     * @param word string
     * @param x x-direction position
     * @param y y-direction position
     */
    placeWord(word, x, y) {

        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        self.containerCloudRef.appendChild(word);
        word.style.left = x - word.offsetWidth/2 + "px";
        word.style.top = y - word.offsetHeight/2 + "px";
        word.style.color = "#" + randomColor;

        self.wordsDown.push(word.getBoundingClientRect());
    }

    /**
     * Fill the positions of the words
     * @param x
     * @param y
     */
    trace(x, y) {
        this.ctx.fillRect(x, y, 1, 1);
    }

    /**
     * Create the word layout
     * @param i int
     * @param callback function to be executed
     */
    spiral(i, callback) {
        self.angle = self.config.spiralResolution * i;
        self.x = (1 + self.angle) * Math.cos(self.angle);
        self.y = (1 + self.angle) * Math.sin(self.angle);
        return callback ? callback() : null;
    }

    /**
     * Check the intersection of each words
     * @param word string
     * @param x x-direction position
     * @param y y-direction position
     */
    intersect(word, x, y) {
        self.containerCloudRef.appendChild(word);

        word.style.left = x - word.offsetWidth/2 + "px";
        word.style.top = y - word.offsetHeight/2 + "px";

        let currentWord = word.getBoundingClientRect();

        self.containerCloudRef.removeChild(word);

        for(let i = 0; i < self.wordsDown.length; i+=1){
            let comparisonWord = self.wordsDown[i];

            if(!(currentWord.right + self.config.xWordPadding < comparisonWord.left - self.config.xWordPadding ||
                currentWord.left - self.config.xWordPadding > comparisonWord.right + self.config.xWordPadding ||
                currentWord.bottom + self.config.yWordPadding < comparisonWord.top - self.config.yWordPadding ||
                currentWord.top - self.config.yWordPadding > comparisonWord.bottom + self.config.yWordPadding)){

                return true;
            }
        }

        return false;
    }

    /**
     * Process the placements of all words
     */
    placeWords() {
        for (let i = 0; i < self.words.length; i += 1) {
            let word = self.createWordObject(self.words[i].word, self.words[i].freq);
            for (let j = 0; j < self.config.spiralLimit; j++) {
                //If the spiral function returns true, we've placed the word down and can break from the j loop
                if (self.spiral(j, function() {
                    if (!self.intersect(word, self.startPoint.x + self.x, self.startPoint.y + self.y)) {
                        self.placeWord(word, self.startPoint.x + self.x, self.startPoint.y + self.y);
                        return true;
                    }
                })) {
                    break;
                }
            }
        }
    }

    /**
     * Trace the path that needs to be drawn on the canvas
     * start passing the frame for animation
     */
    traceSpiral() {
        this.ctx.beginPath();
        if (self.config.trace) {
            let frame = 1;
            self.animate(frame);
        }

        self.loaderRef.style.display = "none";
    }


    /**
     * Animate the frame that has been passed after tracing the path
     * @param frame string
     */
    animate(frame) {
        self.spiral(frame, function() {
            self.trace(self.startPoint.x + self.x, self.startPoint.y + self.y);
        });

        frame += 1;

        if (frame < self.config.spiralLimit) {
            window.requestAnimationFrame(self.animate);
        }
    }


    /**
     * Render the words cloud component that needs to be drawn on the canvas
     */
    render() {
        return (
            <div className="container-word-cloud" ref={elem => self.containerCloudRef = elem}>
                <div className="loader" ref={elem => self.loaderRef = elem} />
                <canvas ref={elem => self.canvasRef = elem} width={640} height={425} />
            </div>
        );
    }
}

export default TagCloud;