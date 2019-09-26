import React from 'react';
import Button from '../../reusables/Button';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

export default function ChooseRole(props) {
  const buttons = [
    { id: 1, value: 'mentor', buttonText: 'Teach' },
    { id: 2, value: 'mentee', buttonText: 'Learn' },
    { id: 3, value: 'peer', buttonText: 'Collaborate' },
  ];
  return (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionName="componentFadeIn"
      transitionAppearTimeout={9000}
      transitionLeaveTimeout={9000}
      transitionEnterTimeout={9000}
    >
      <section className="hero">
        <div
          className="hero-body"
          style={{ paddingBottom: '0px', paddingTop: '30px' }}
        >
          <div className="container">
            <h1 className="title" style={{ marginBottom: '12px' }}>
              Request a Meetup
            </h1>
            <p>
              Lorem ipsum dolor sit amet, pri quod inimicus disputando cu, sit
              facilisi abhorreant in. Pri iudico euismod copiosae in, salutatus
              democritum sit no.
            </p>
          </div>
        </div>
      </section>

      <div className="section" style={{ paddingTop: '30px' }}>
        <div className="container">
          <div className="tile is-ancestor matchBackground">
            <div className="tile is-parent is-1 matchBackground"></div>

            {buttons.map(info => (
              <div key={info.id} className="tile is-parent matchBackground">
                <div
                  className="tile is-child matchBackground"
                  style={{ textAlign: 'center', borderRadius: '0px' }}
                >
                  <Button
                    customDivStyle={{ margin: '14px' }}
                    divStyle={'centerInDiv'}
                    key={info.id}
                    value={info.value}
                    buttonStyle="is-medium is-primary is-outlined centerItem"
                    buttonText={info.buttonText}
                    handleClick={props.handleRoleChoice}
                  />
                </div>
              </div>
            ))}

            <div className="tile is-parent is-1"></div>
          </div>
        </div>
      </div>
    </CSSTransitionGroup>
  );
}

ChooseRole.propTypes = {
  handleRoleChoice: PropTypes.func,
  key: PropTypes.string,
};
