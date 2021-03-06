// @flow
// side nav panel container'
import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { ConnectPanel } from '../components/ConnectPanel'
import { UploadPanel } from '../components/UploadPanel'
import { CalibratePanel } from '../components/CalibratePanel'
import { MorePanel } from '../components/MorePanel'
import { RunPanel } from '../components/RunPanel'

export function SidePanel(): React.Node {
  return (
    <Switch>
      <Route path="/robots/:name?" component={ConnectPanel} />
      <Route path="/more" component={MorePanel} />
      <Route path="/upload" component={UploadPanel} />
      <Route path="/calibrate" component={CalibratePanel} />
      <Route path="/run" component={RunPanel} />
    </Switch>
  )
}
