import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import { useState } from 'react';

export default function App() {

  const jogoIncial=[['', '', ''], ['', '', ''], ['', '', '']]
  const [jogo, setJogo] = useState(jogoIncial)
  const [turno, setTurno] = useState('X')
  const [jogando, setJogando] = useState(true)

  const tabuleiro = () => {
    return (
      <View style={styles.tabu}>
        <View style={styles.tabuLinha}>
          <TouchableOpacity style={styles.casa} onPress={() => joga(0,0)}><Text>{jogo[0][0]}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.casa} onPress={() => joga(0,1)}><Text>{jogo[0][1]}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.casa} onPress={() => joga(0,2)}><Text>{jogo[0][2]}</Text></TouchableOpacity>
        </View>
        <View style={styles.tabuLinha}>
          <TouchableOpacity style={styles.casa} onPress={() => joga(1,0)}><Text>{jogo[1][0]}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.casa} onPress={() => joga(1,1)}><Text>{jogo[1][1]}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.casa} onPress={() => joga(1,2)}><Text>{jogo[1][2]}</Text></TouchableOpacity>
        </View>
        <View style={styles.tabuLinha}>
          <TouchableOpacity style={styles.casa} onPress={() => joga(2,0)}><Text>{jogo[2][0]}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.casa} onPress={() => joga(2,1)}><Text>{jogo[2][1]}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.casa} onPress={() => joga(2,2)}><Text>{jogo[2][2]}</Text></TouchableOpacity>
        </View>
      </View>
    );
  };

    const verificaVitoria=()=>{
      let pontos = 0
      let vitoria=false
      //verifica linhas
      for(let i=0; i<3; i++){
        pontos=0;
        for(let j=0; j<3; j++){
          if(jogo[i][j]===turno) 
            pontos++
        }
        if(pontos >=3){
          vitoria=true
          break
        }
      }
      //verifica colunas
      for(let c=0; c<3; c++){
        pontos=0;
        for(let l=0; l<3; l++){
          if(jogo[l][c]===turno) 
            pontos++
        }
        if(pontos >=3){
          vitoria=true
          break
        }
      }
      // verifica diagonal
      pontos=0
      for(let d=0; d<3; d++){
        if(jogo[d][d]===turno) 
          pontos++
      }
      if(pontos >=3){
        vitoria=true
      }
      return vitoria
    }

  const trocaTurno=()=>{
    setTurno(turno === 'X' ? 'O' : 'X')
  }

  const verificaEspacoVazio = (linha, coluna) => {
    return jogo[linha][coluna] === '';
  }

  const joga = (linha, coluna) => {
    if (jogando && verificaEspacoVazio(linha, coluna)) {
      // Cria uma cópia do tabuleiro para não modificar o estado diretamente
      const novoJogo = jogo.map((row, i) => row.map((cell, j) => (i === linha && j === coluna ? turno : cell)));
      setJogo(novoJogo);
      if (verificaVitoria()) {
        alert("O jogador " + turno + " venceu!");
        setJogando(false);
      } else if (novoJogo.flat().every(cell => cell !== '')) {
        alert("Deu VÉIA!");
        setJogando(false);
      } else {
        trocaTurno();
      }
    }
  }

  const reiniciarJogo=()=>{
    setJogo(jogoIncial)
    setTurno('X')
    setJogando(true)
  }

  const BtnJogarNovamente = () => {
    if (!jogando) {
      return (
        <TouchableOpacity onPress={reiniciarJogo} style={{marginTop: 20, padding: 10, backgroundColor: '#ccc', borderRadius: 5}}>
          <Text>Jogar Novamente</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Quem joga: {turno}</Text>
      </View>
      <View>
        {tabuleiro()}
      </View>
      <View>
        {BtnJogarNovamente()}
      </View>
    </View>
  );
}