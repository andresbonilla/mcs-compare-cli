This uses MCS Commercial Dental Coverage PDF files available for download from MCS

To install, cd into project folder and run:
```sh
npm i
```
```sh
npm link
```

Sample usage:
```sh
mcscompare /Users/andbonil/Desktop/2019.pdf /Users/andbonil/Desktop/2020.pdf
```

Optional column argument changes the column being compared. It's 5 by default. Compare columns from 2 to 6.
```sh
mcscompare /Users/andbonil/Desktop/2019.pdf /Users/andbonil/Desktop/2020.pdf --col 4
```
