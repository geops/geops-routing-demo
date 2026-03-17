import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Mail from '@mui/icons-material/Mail';

function JiraMailLink({
  mot,
  via,
  expectedVias,
  expectedLevels,
  generalizationGraph,
  minKm,
  maxKm,
}) {
  const mailUrl = useMemo(() => {
    const subject = encodeURIComponent(`Routing issue - ${mot}`);

    const indent = '\u00A0\u00A0\u00A0';

    const bodyLines = [
      'Hello geOps-Team',
      'Please test and revise this routing case:',
      '',
      '-----',
      `${mot}-xx:`,
      `${indent}description: Fill out`,
      `${indent}mot: ${mot}`,
      `${indent}via: ${via}`,
    ];

    if (expectedVias?.length) {
      bodyLines.push(`${indent}expect_via:`);
      expectedVias.forEach((v) => {
        bodyLines.push(`${indent}${indent}- ${v}`);
      });
    }

    if (expectedLevels?.length) {
      bodyLines.push(`${indent}expect_level:`);
      expectedLevels.forEach((l) => {
        bodyLines.push(`${indent}${indent}- ${l}`);
      });
    }

    if (generalizationGraph) {
      bodyLines.push(`${indent}graph: ${generalizationGraph}`);
    }

    bodyLines.push(
      `${indent}min_km: ${minKm}`,
      `${indent}max_km: ${maxKm}`,
      '-----',
      '',
      'Thank you very much and best regards',
      'Your routing tester',
    );

    const body = encodeURIComponent(bodyLines.join('\r\n'));

    return `mailto:jira@geops.ch?subject=${subject}&body=${body}`;
  }, [
    mot,
    expectedVias,
    expectedLevels,
    generalizationGraph,
    minKm,
    maxKm,
    via,
  ]);

  return (
    <Button
      component="a"
      href={mailUrl}
      rel="noopener noreferrer"
      target="_blank"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6 }}
    >
      <Mail fontSize="small" />
      Report issue
    </Button>
  );
}

JiraMailLink.propTypes = {
  mot: PropTypes.string.isRequired,
  via: PropTypes.string.isRequired,
  expectedVias: PropTypes.arrayOf(PropTypes.string),
  expectedLevels: PropTypes.arrayOf(PropTypes.string),
  generalizationGraph: PropTypes.string,
  minKm: PropTypes.string.isRequired,
  maxKm: PropTypes.string.isRequired,
};

export default JiraMailLink;
