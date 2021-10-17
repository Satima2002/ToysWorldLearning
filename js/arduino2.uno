char R[] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'};
String M[] = {".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----"};

String myESTR = "";  //to create string from characters
String myMSTR = "";   //to create morze string 

int dotT=200;  //dot blink time
int dashT=1000; //dash blink time(longer)
int spaceT=2000;  //space time between words
int m = sizeof(R)/sizeof(R[0]);  

char chr;

int PIN = 8;

void setup()
{
  pinMode(PIN, OUTPUT);    // 8 is the output pin on the board and it for output signal, not for imput
  Serial.begin(9600);
  Serial.println("For beginning, enter the any character and for finishing enter "*" in the end: ");
}

void loop()
{
  if (Serial.available() > 0)
  {
    chr = Serial.read();
    //Serial.print(chr, DEC);
    process(chr);
  }

}

void process(char ch)
{
  if ( ch != 42 )  //42 is the size of "*" because exact this character will finish our loop
  {
    myESTR = myESTR + ch; //Collectin chars to String
    if((chr >= 65 && chr <= 90) || (chr >= 48 && chr <= 57) || chr == 32)
    {
      for(int i = 0; i < m; i++)
      {
        if(ch == R[i])
        {
          myMSTR += M[i];
          myMSTR += ' ';  
          break;
        }
      }
    }
  } 
  else {    
    Serial.print(myESTR); // Printing collected String to Terminal
    Serial.print(" -> ");    
    Serial.println(myMSTR); 
    analyzeMorze(myMSTR);
    
    Serial.println("Blink is finished ");
    myESTR = ""; // Empting String
    myMSTR = ""; // Empting Morze String m
  }  
}  

void analyzeMorze(String MS){
  int MSL = MS.length();
  for( int i = 0; i < MSL; i++){
    if(MS[i] == '.'){
      mBlink(dotT,1);
    }
    if (MS[i] == '-'){
      mBlink(dashT,1);
    }
    if (MS[i] == ' '){
      mBlink(spaceT,0);
    }
  }
}

void mBlink(int DT,int ST){   //function created for blinking our morze code
  if (ST==1){
  digitalWrite(PIN, HIGH);
  delay(DT);
  digitalWrite(PIN, LOW);
  delay(DT);
  }
  else{
    delay(DT);
  }
}