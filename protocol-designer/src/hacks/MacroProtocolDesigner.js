// @flow
import * as React from 'react'

import { useProtocolSessionApi } from './api'

import { Flex, Box } from '@opentrons/components'
import { CommandList } from './CommandList'
import { ClickableDeckMap } from './ClickableDeckMap'
import { HostnameInput } from './HostnameInput'

import type { Command } from './command-types'
import type { LabwareData } from './labware-types'
import type { Highlight } from './ui-types'

export function MacroProtocolDesigner(): React.Node {
  const {
    hostname,
    setHostname,
    session,
    createSession,
    deleteSession,
    loadLabware,
    moveToWell,
  } = useProtocolSessionApi()

  const [highlights, setHighlights] = React.useState<Array<Highlight>>([])

  const commands: Array<Command> = session?.details.commands ?? []
  const labware: Array<LabwareData> = session?.details.labware ?? []

  const handleCommandClick = commandId => {
    const command = commands.find(c => c.commandId === commandId)
    const commandData = command?.command

    const labwareId =
      // $FlowFixMe: this is safe but flow doesn't like it
      commandData?.request.labwareId ?? commandData?.result?.labwareId ?? null

    // $FlowFixMe: this is safe but flow doesn't like it
    const wellName = commandData?.request.wellName ?? null

    setHighlights([{ commandId, labwareId, wellName }])
  }

  const handleWellClick = (labwareId, wellName) => {
    moveToWell({ labwareId, wellName })
  }

  return (
    <Box padding="2rem">
      <HostnameInput
        hostname={hostname}
        setHostname={setHostname}
        marginBottom="1rem"
      />
      {session == null ? (
        <button onClick={() => createSession()}>Start session</button>
      ) : (
        <button onClick={() => deleteSession()}>End session</button>
      )}
      <Flex flexDirection="row" marginTop="1rem">
        <Box width="32rem">
          <CommandList
            commands={commands}
            highlights={highlights}
            onCommandClick={handleCommandClick}
          />
        </Box>
        <Box width="52rem" height="52rem">
          <ClickableDeckMap
            labware={labware}
            loadLabware={loadLabware}
            highlights={highlights}
            onWellClick={handleWellClick}
          />
        </Box>
      </Flex>
    </Box>
  )
}
