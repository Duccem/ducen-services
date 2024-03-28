import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'
import { GenericError } from '../../src/modules/shared/components/GenericError/GenericError'

describe('index', () => {
  test('Error', ()=> {
    render(<GenericError error={new Error('Error in head')} action={undefined}/>)
    expect(screen.getByText('Error in head')).toBeTruthy()
  })
})
