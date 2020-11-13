import React from 'react';
import { Service } from '../src/di/decorate/service';
// import { Service } from 'di-service'; // npm pack test
import { ILog } from './service/serviceInterface/log';
import { IClassProvider } from './service/serviceInterface/classProvider';
import { INumberProvider } from './service/serviceInterface/constProvider';
import { IFunctionProvider } from './service/serviceInterface/functionProvider';
import { IObjectProvider } from './service/serviceInterface/objectProvider';
import './regiserService';


@Service([
    'LogService',
    'FunctionService',
    'ObjectService',
    'NumberService',
    'ClassService',
])
export default class DITest2 extends React.Component {
    state = { score: 211 }
    constructor(props: any, {}, private Services: { LogService: ILog, FunctionService: IFunctionProvider, NumberService: INumberProvider, ClassService: IClassProvider, ObjectService: IObjectProvider }) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Service Decorate Test</h2>
                <section
                    onClick={() => {
                        this.setState({ score: ++this.state.score }, () => {
                            this.Services.LogService.log(this.state.score);
                            this.Services.FunctionService('[ObjectService]', this.Services.ObjectService.Score);
                            this.Services.ClassService.log('[NumberService]', this.Services.NumberService);
                        })
                    }}
                > My Score Is: {this.state.score}</section>
            </div>
        )
    }
}