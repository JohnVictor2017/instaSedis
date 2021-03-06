import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FotoHeader extends Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.foto.urlPerfil} alt="foto do usuario" />
          <figcaption className="foto-usuario">
            <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
              {this.props.foto.loginUsuario}
            </Link>
          </figcaption>
        </figure>

        <time className="foto-data">{this.props.foto.horario}</time>
      </header>
    );
  }
}
class FotoInfo extends Component {
  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {this.props.foto.likers.map(curtida => {
            return (
              <Link key={curtida.login} to={`/timeline/${curtida.login}`}>
                {curtida.login},
              </Link>
            );
          })}
          <a> ... curtiram</a>
        </div>

        <p className="foto-info-legenda">
          <Link
            to={`/timeline/${this.props.foto.loginUsuario} `}
            className="foto-info-autor"
          >
            {this.props.foto.loginUsuario}{' '}
          </Link>
          {this.props.foto.comentario}
        </p>

        <ul className="foto-info-comentarios">
          {this.props.foto.comentarios.map(comentario => {
            return (
              <li className="comentarios" key={comentario.id}>
                <Link
                  to={`/timeline/${comentario.login} `}
                  className="foto-info-autor"
                >
                  {comentario.login}
                </Link>
                <a> {comentario.texto}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
class FotoAtualizacoes extends Component {
  curtir(event) {
    event.preventDefault();
    this.props.curtir(this.props.foto.id);
  }
  comentar(event) {
    event.preventDefault();
    if (this.comentario.value !== '') {
      this.props.comentar(this.props.foto.id, this.comentario.value);
      this.comentario.value = '';
    }
  }
  render() {
    const likers = this.props.foto.likers.map(liker => liker.login);
    const fotoCurtida = likers.includes(this.props.foto.loginUsuario);

    return (
      <section className="fotoAtualizacoes">
        <a
          onClick={this.curtir.bind(this)}
          className={
            fotoCurtida
              ? 'fotoAtualizacoes-like-ativo'
              : 'fotoAtualizacoes-like'
          }
        >
          Linkar
        </a>
        <form
          className="fotoAtualizacoes-form"
          onSubmit={this.comentar.bind(this)}
        >
          <input
            type="text"
            ref={input => (this.comentario = input)}
            placeholder="Adicione um comentário..."
            className="fotoAtualizacoes-form-campo"
          />
          <input
            type="submit"
            value="Comentar!"
            className="fotoAtualizacoes-form-submit"
          />
        </form>
      </section>
    );
  }
}
export default class Publicacao extends Component {
  render() {
    return (
      <div className="foto">
        <FotoHeader foto={this.props.foto} />
        <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
        <FotoInfo foto={this.props.foto} key={this.props.foto.id} />
        {isLoggedIn() ? '' : <FotoAtualizacoes {...this.props} />}
      </div>
    );
  }
}

function isLoggedIn() {
  return localStorage.getItem('auth-token') === null;
}
/* Cachorro: https://i.pinimg.com/originals/c2/f1/15/c2f1157bd0e45b018fffacccc4624401.jpg*/
