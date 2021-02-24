<?php
namespace BetterLinks\Tools\Migration;

class PTLBase
{
	public function terms_insert($categories)
	{
		$termsList = [];
		$message = [];
		foreach ($categories as $short_url => $catName) {
			if (!\BetterLinks\Helper::term_exists($catName) && !isset($termsList[\BetterLinks\Helper::make_slug($catName)])) {
				$termsList[\BetterLinks\Helper::make_slug($catName)] = [
					'term_name' => str_replace('-', ' ', ucwords($catName, '-')),
					'term_slug' => \BetterLinks\Helper::make_slug($catName),
					'term_type' => 'category',
				];
				$message[] = 'Imported Successfully "' . $catName . '"';
			} else {
				$message[] = 'import failed "' . $catName . '" already exists';
			}
		}
		if (count($termsList) > 0) {
			$this->DB->table('betterlinks_terms')->insert($termsList);
		}
		$this->terms_relationship_insert($categories);
		return $message;
	}

	public function terms_relationship_insert($categories)
	{
		$termRelationList = [];
		foreach ($categories as $short_url => $catName) {
			$link = $this->DB
				->table('betterlinks')
				->where('short_url', '=', $short_url)
				->get();
			$term = $this->DB
				->table('betterlinks_terms')
				->where('term_slug', '=', $catName)
				->get();
			if ($link[0]->ID > 0) {
				$termRelationList[] = [
					'term_id' => $term[0]->ID,
					'link_id' => $link[0]->ID,
				];
			}
		}
		if (count($termRelationList) > 0) {
			$this->DB->table('betterlinks_terms_relationships')->insert($termRelationList);
		}
	}
}
