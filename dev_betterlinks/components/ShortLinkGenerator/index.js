import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { makeRequest, betterlinks_nonce } from '../../utils/helper';
import Select from 'react-select';

const ShortLinkGenerator = () => {
    const [postTypes, setPostTypes] = useState([]);
    const [selectedPostType, setSelectedPostType] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [postLimit, setPostLimit] = useState('');
    const [sorting, setSorting] = useState('date_desc');
    const [includeExisting, setIncludeExisting] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [postCount, setPostCount] = useState(null);
    const [countLoading, setCountLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [generationInProgress, setGenerationInProgress] = useState(false);
    const [generationStatus, setGenerationStatus] = useState(null);

    // Advanced filters
    const [descriptionLength, setDescriptionLength] = useState(150);
    const [redirectType, setRedirectType] = useState('301');
    const [targetUrlSource, setTargetUrlSource] = useState('permalink');
    const [customFieldKey, setCustomFieldKey] = useState('');
    const [manualPattern, setManualPattern] = useState('');
    const [slugType, setSlugType] = useState('existing');
    const [slugLength, setSlugLength] = useState(10);
    const [collisionHandling, setCollisionHandling] = useState('append');
    const [categoryAssignment, setCategoryAssignment] = useState('same');
    const [customCategory, setCustomCategory] = useState('');
    const [customTags, setCustomTags] = useState([]);
    const [betterlinkCategories, setBetterlinkCategories] = useState([]);
    const [selectedBetterlinkCategory, setSelectedBetterlinkCategory] = useState(null);

    // Load post types on mount
    useEffect(() => {
        loadPostTypes();
        loadBetterlinkCategories();
    }, []);

    // Update categories when post type changes
    useEffect(() => {
        if (selectedPostType) {
            const postTypeData = postTypes.find(pt => pt.name === selectedPostType.value);
            if (postTypeData) {
                const categoryOptions = [];
                Object.keys(postTypeData.categories).forEach(taxonomy => {
                    const taxData = postTypeData.categories[taxonomy];
                    taxData.terms.forEach(term => {
                        categoryOptions.push({
                            value: term.id,
                            label: `${term.name} (${taxData.label})`,
                            taxonomy: taxonomy
                        });
                    });
                });
                setCategories(categoryOptions);

                const tagOptions = [];
                Object.keys(postTypeData.tags).forEach(taxonomy => {
                    const taxData = postTypeData.tags[taxonomy];
                    taxData.terms.forEach(term => {
                        tagOptions.push({
                            value: term.id,
                            label: `${term.name} (${taxData.label})`,
                            taxonomy: taxonomy
                        });
                    });
                });
                setTags(tagOptions);
            }
        }
        setSelectedCategories([]);
        setSelectedTags([]);
    }, [selectedPostType, postTypes]);

    // Update post count when filters change
    useEffect(() => {
        if (selectedPostType) {
            updatePostCount();
        } else {
            setPostCount(null);
        }
    }, [selectedPostType, selectedCategories, selectedTags, includeExisting]);

    const loadPostTypes = async () => {
        setIsLoading(true);
        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_post_types_with_taxonomies',
                security: betterlinks_nonce
            });

            if (response.data && response.data.success) {
                setPostTypes(response.data.data);
            }
        } catch (error) {
            console.error('Error loading post types:', error);
        }
        setIsLoading(false);
    };

    const loadBetterlinkCategories = async () => {
        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_betterlink_categories',
                security: betterlinks_nonce
            });

            if (response.data && response.data.success) {
                setBetterlinkCategories(response.data.data);
            }
        } catch (error) {
            console.error('Error loading BetterLink categories:', error);
        }
    };

    const updatePostCount = async () => {
        if (!selectedPostType) {
            setPostCount(null);
            return;
        }

        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_posts_count',
                post_type: selectedPostType.value,
                categories: selectedCategories.map(cat => cat.value),
                tags: selectedTags.map(tag => tag.value),
                include_existing: includeExisting,
                security: betterlinks_nonce
            });

            if (response && response.data && response.data.success) {
                setPostCount(response.data.data.count || 0);
            } else {
                console.error('API response error:', response);
                setPostCount(0);
            }
        } catch (error) {
            console.error('Error getting post count:', error);
            console.error('Error details:', {
                selectedPostType: selectedPostType,
                selectedCategories: selectedCategories,
                selectedTags: selectedTags,
                includeExisting: includeExisting
            });
            setPostCount(0);
        }
    };

    const handleCountPosts = async () => {
        setCountLoading(true);
        await updatePostCount();
        setCountLoading(false);
    };

    const handleGenerate = () => {
        if (!selectedPostType || selectedCategories.length === 0) {
            alert(__('Please select a post type and at least one category.', 'betterlinks'));
            return;
        }
        setShowConfirmation(true);
    };

    const confirmGeneration = async () => {
        setShowConfirmation(false);
        setGenerationInProgress(true);

        const filters = {
            post_type: selectedPostType.value,
            categories: selectedCategories.map(cat => cat.value),
            tags: selectedTags.map(tag => tag.value),
            post_limit: postLimit ? parseInt(postLimit) : 0,
            sorting,
            include_existing: includeExisting,
            description_length: descriptionLength,
            redirect_type: redirectType,
            target_url_source: targetUrlSource,
            custom_field_key: customFieldKey,
            manual_pattern: manualPattern,
            slug_type: slugType,
            slug_length: slugLength,
            collision_handling: collisionHandling,
            category_assignment: categoryAssignment,
            custom_category: customCategory,
            custom_tags: customTags,
            betterlink_category: selectedBetterlinkCategory ? selectedBetterlinkCategory.value : null
        };

        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/start_bulk_generation',
                ...filters,
                security: betterlinks_nonce
            });

            if (response.data && response.data.success) {
                // Start polling for progress
                pollProgress();
            } else {
                setGenerationInProgress(false);
                const errorMessage = response.data && response.data.data && response.data.data.message
                    ? response.data.data.message
                    : response.data && response.data.message
                        ? response.data.message
                        : __('Failed to start generation', 'betterlinks');
                alert(errorMessage);
            }
        } catch (error) {
            setGenerationInProgress(false);
            console.error('Error starting generation:', error);
            alert(__('Error starting generation. Please try again.', 'betterlinks'));
        }
    };

    const pollProgress = () => {
        const interval = setInterval(async () => {
            try {
                const response = await makeRequest({
                    action: 'betterlinks/admin/get_generation_progress',
                    security: betterlinks_nonce
                });

                if (response.data && response.data.success) {
                    const status = response.data.data;
                    setGenerationStatus(status);

                    if (status.status === 'completed' || status.status === 'cancelled') {
                        clearInterval(interval);
                        setGenerationInProgress(false);
                    }
                }
            } catch (error) {
                console.error('Error polling progress:', error);
                clearInterval(interval);
                setGenerationInProgress(false);
            }
        }, 2000);
    };

    const postTypeOptions = postTypes.map(pt => ({
        value: pt.name,
        label: pt.label
    }));

    const sortingOptions = [
        { value: 'date_desc', label: __('Created Date (Newest First)', 'betterlinks') },
        { value: 'date_asc', label: __('Created Date (Oldest First)', 'betterlinks') },
        { value: 'title_asc', label: __('Title (A-Z)', 'betterlinks') },
        { value: 'title_desc', label: __('Title (Z-A)', 'betterlinks') }
    ];

    const redirectTypeOptions = [
        { value: '301', label: __('301 (Permanent)', 'betterlinks') },
        { value: '302', label: __('302 (Temporary)', 'betterlinks') },
        { value: '307', label: __('307 (Temporary)', 'betterlinks') }
    ];

    const targetUrlSourceOptions = [
        { value: 'permalink', label: __('Post Permalink', 'betterlinks') },
        { value: 'custom_field', label: __('Custom Field', 'betterlinks') },
        { value: 'manual_pattern', label: __('Manual Pattern', 'betterlinks') }
    ];

    const slugTypeOptions = [
        { value: 'existing', label: __('Existing Slug', 'betterlinks') },
        { value: 'title', label: __('Suggest From Title', 'betterlinks') },
        { value: 'random', label: __('Random', 'betterlinks') }
    ];

    const collisionHandlingOptions = [
        { value: 'append', label: __('Append Increment (-2, -3...)', 'betterlinks') },
        { value: 'regenerate', label: __('Regenerate', 'betterlinks') },
        { value: 'skip', label: __('Skip and Report', 'betterlinks') }
    ];

    const categoryAssignmentOptions = [
        { value: 'same', label: __('Same as Post Category', 'betterlinks') },
        { value: 'custom', label: __('Custom Category', 'betterlinks') },
        { value: 'betterlink', label: __('Betterlink Category', 'betterlinks') }
    ];

    return (
        <div className="btl-short-link-generator">
            <div className="btl-header">
                <h2>{__('Short Link Generator', 'betterlinks')}</h2>
                <div className="btl-description">
                    {__('Generate short links in bulk based on your selected filters. This tool will create BetterLinks for posts matching your criteria.', 'betterlinks')}
                </div>
            </div>

            {!generationInProgress ? (
                <div className="btl-generator-form">
                    {/* Step 1: Required Inputs */}
                    <div className="btl-form-section">
                        <h3>{__('Required Settings', 'betterlinks')}</h3>

                        <div className="btl-form-row">
                            <div className="btl-form-col">
                                <div className="btl-bulk-link-form-group">
                                    <label>{__('Post Type', 'betterlinks')} *</label>
                                    <Select
                                        className="btl-custom-post-select-type"
                                        value={selectedPostType}
                                        onChange={setSelectedPostType}
                                        options={postTypeOptions}
                                        placeholder={__('Select post type...', 'betterlinks')}
                                        isLoading={isLoading}
                                        isClearable={false}
                                    />
                                </div>
                            </div>

                            {selectedPostType && (
                                <div className="btl-form-col">
                                    <div className="btl-bulk-link-form-group">
                                        <label>{__('Categories', 'betterlinks')} *</label>
                                        {categories.length === 0 ? (
                                            <div className="btl-helper-text">
                                                {__('This post type has no categories available.', 'betterlinks')}
                                            </div>
                                        ) : (
                                            <Select
                                                className="btl-custom-post-select-cat"
                                                value={selectedCategories}
                                                onChange={setSelectedCategories}
                                                options={categories}
                                                placeholder={__('Select categories...', 'betterlinks')}
                                                isMulti
                                                isClearable
                                                closeMenuOnSelect={false}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {!selectedPostType && (
                            <div className="btl-helper-text">
                                {__('Please select a post type to see available categories.', 'betterlinks')}
                            </div>
                        )}

                        {postCount > 0 && (
                            <div className="btl-post-count">
                                <p><strong>{__('Posts found:', 'betterlinks')} {postCount}</strong></p>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Advanced Filters */}
                    <div className="btl-form-section">
                        <div
                            className="btl-accordion-header"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                        >
                            <h3>{__('Advanced Filters', 'betterlinks')}</h3>
                            <span className={`btl-accordion-arrow ${showAdvanced ? 'open' : ''}`}>▼</span>
                        </div>

                        {showAdvanced && (
                            <div className="btl-accordion-content">
                                {/* Post Filtering */}
                                <div className="btl-subsection">
                                    <h4>{__('Post Filtering', 'betterlinks')}</h4>

                                    <div className="btl-form-row">
                                        {tags.length > 0 && (
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('Tags', 'betterlinks')}</label>
                                                    <Select
                                                        value={selectedTags}
                                                        onChange={setSelectedTags}
                                                        options={tags}
                                                        placeholder={__('Select tags...', 'betterlinks')}
                                                        isMulti
                                                        isClearable
                                                        closeMenuOnSelect={false}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Post Limit', 'betterlinks')}</label>
                                                <input
                                                    type="number"
                                                    value={postLimit}
                                                    onChange={(e) => setPostLimit(e.target.value)}
                                                    placeholder={__('Leave empty for no limit', 'betterlinks')}
                                                    min="1"
                                                />
                                                <p className="btl-helper-text">{__('Maximum number of posts to process', 'betterlinks')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="btl-form-row">
                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Sorting', 'betterlinks')}</label>
                                                <Select
                                                    value={sortingOptions.find(opt => opt.value === sorting)}
                                                    onChange={(option) => setSorting(option.value)}
                                                    options={sortingOptions}
                                                    isClearable={false}
                                                />
                                            </div>
                                        </div>

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>&nbsp;</label> {/* Spacer for alignment */}
                                                <div className="btl-checkbox-field">
                                                    <input
                                                        type="checkbox"
                                                        checked={includeExisting}
                                                        onChange={(e) => setIncludeExisting(e.target.checked)}
                                                    />
                                                    <span>{__('Include posts with existing BetterLinks', 'betterlinks')}</span>
                                                </div>
                                                <p className="btl-helper-text">{__('Regenerate links for posts that already have them', 'betterlinks')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Short Link Configuration */}
                                <div className="btl-subsection">
                                    <h4>{__('Short Link Configuration', 'betterlinks')}</h4>

                                    <div className="btl-form-row">
                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Description Length', 'betterlinks')}</label>
                                                <input
                                                    type="number"
                                                    value={descriptionLength}
                                                    onChange={(e) => setDescriptionLength(parseInt(e.target.value))}
                                                    min="0"
                                                    max="500"
                                                />
                                                <p className="btl-helper-text">{__('Characters to include from post excerpt/content', 'betterlinks')}</p>
                                            </div>
                                        </div>

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Redirect Type', 'betterlinks')}</label>
                                                <Select
                                                    value={redirectTypeOptions.find(opt => opt.value === redirectType)}
                                                    onChange={(option) => setRedirectType(option.value)}
                                                    options={redirectTypeOptions}
                                                    isClearable={false}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="btl-form-row">
                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Target URL Source', 'betterlinks')}</label>
                                                <Select
                                                    value={targetUrlSourceOptions.find(opt => opt.value === targetUrlSource)}
                                                    onChange={(option) => setTargetUrlSource(option.value)}
                                                    options={targetUrlSourceOptions}
                                                    isClearable={false}
                                                />
                                            </div>
                                        </div>

                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Shortened URL Type', 'betterlinks')}</label>
                                                <Select
                                                    value={slugTypeOptions.find(opt => opt.value === slugType)}
                                                    onChange={(option) => setSlugType(option.value)}
                                                    options={slugTypeOptions}
                                                    isClearable={false}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {targetUrlSource === 'custom_field' && (
                                        <div className="btl-bulk-link-form-group">
                                            <label>{__('Custom Field Key', 'betterlinks')}</label>
                                            <input
                                                type="text"
                                                value={customFieldKey}
                                                onChange={(e) => setCustomFieldKey(e.target.value)}
                                                placeholder={__('Enter meta key...', 'betterlinks')}
                                            />
                                            <p className="btl-helper-text">{__('The custom field key to use as target URL', 'betterlinks')}</p>
                                        </div>
                                    )}

                                    {targetUrlSource === 'manual_pattern' && (
                                        <div className="btl-bulk-link-form-group">
                                            <label>{__('Manual Pattern', 'betterlinks')}</label>
                                            <input
                                                type="text"
                                                value={manualPattern}
                                                onChange={(e) => setManualPattern(e.target.value)}
                                                placeholder={__('e.g., https://example.com/{post_slug}', 'betterlinks')}
                                            />
                                            <p className="btl-helper-text">{__('Use {post_slug}, {post_id}, or {post_title} as placeholders', 'betterlinks')}</p>
                                        </div>
                                    )}

                                    {(slugType === 'title' || slugType === 'random') && (
                                        <div className="btl-form-row">
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('Short URL Length', 'betterlinks')}</label>
                                                    <input
                                                        type="number"
                                                        value={slugLength}
                                                        onChange={(e) => setSlugLength(parseInt(e.target.value))}
                                                        min="3"
                                                        max="50"
                                                    />
                                                    <p className="btl-helper-text">
                                                        {slugType === 'title'
                                                            ? __('Maximum number of words from title', 'betterlinks')
                                                            : __('Number of characters for random slug', 'betterlinks')
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('Collision Handling', 'betterlinks')}</label>
                                                    <Select
                                                        value={collisionHandlingOptions.find(opt => opt.value === collisionHandling)}
                                                        onChange={(option) => setCollisionHandling(option.value)}
                                                        options={collisionHandlingOptions}
                                                        isClearable={false}
                                                    />
                                                    <p className="btl-helper-text">{__('What to do when URL already exists', 'betterlinks')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="btl-form-row">
                                        <div className="btl-form-col">
                                            <div className="btl-bulk-link-form-group">
                                                <label>{__('Category Assignment', 'betterlinks')}</label>
                                                <Select
                                                    value={categoryAssignmentOptions.find(opt => opt.value === categoryAssignment)}
                                                    onChange={(option) => setCategoryAssignment(option.value)}
                                                    options={categoryAssignmentOptions}
                                                    isClearable={false}
                                                />
                                            </div>
                                        </div>

                                        {categoryAssignment === 'custom' && (
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('Custom Category', 'betterlinks')}</label>
                                                    <input
                                                        type="text"
                                                        value={customCategory}
                                                        onChange={(e) => setCustomCategory(e.target.value)}
                                                        placeholder={__('Enter category name...', 'betterlinks')}
                                                    />
                                                    <p className="btl-helper-text">{__('Category name for all generated links', 'betterlinks')}</p>
                                                </div>
                                            </div>
                                        )}

                                        {categoryAssignment === 'betterlink' && (
                                            <div className="btl-form-col">
                                                <div className="btl-bulk-link-form-group">
                                                    <label>{__('BetterLink Category', 'betterlinks')}</label>
                                                    <Select
                                                        value={selectedBetterlinkCategory}
                                                        onChange={setSelectedBetterlinkCategory}
                                                        options={betterlinkCategories}
                                                        placeholder={__('Select BetterLink category...', 'betterlinks')}
                                                        isClearable={true}
                                                        isLoading={betterlinkCategories.length === 0}
                                                    />
                                                    <p className="btl-helper-text">{__('Choose a BetterLink category for all generated links', 'betterlinks')}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="btl-form-actions">
                        <div className="btl-actions-group">
                            <button
                                type="button"
                                className="btl-btn btl-btn-secondary"
                                onClick={handleCountPosts}
                                disabled={isLoading || !selectedPostType || generationInProgress}
                            >
                                {countLoading ? (
                                    <>
                                        <span className="btl-spinner"></span>
                                        {__('Counting...', 'betterlinks')}
                                    </>
                                ) : (
                                    __('Count Posts', 'betterlinks')
                                )}
                            </button>

                            <button
                                className="btl-btn btl-btn-primary"
                                onClick={handleGenerate}
                                disabled={!selectedPostType || isLoading || generationInProgress || (postCount === 0 && postCount !== null)}
                            >
                                {isLoading || generationInProgress ? (
                                    <>
                                        <span className="btl-spinner"></span>
                                        {__('Generating...', 'betterlinks')}
                                    </>
                                ) : (
                                    __('Generate Short Links', 'betterlinks')
                                )}
                            </button>
                        </div>

                        {postCount !== null && (
                            <div className="btl-post-count">
                                <span className="btl-count-label">{__('Posts found:', 'betterlinks')}</span>
                                <span className="btl-count-value">{postCount}</span>
                            </div>
                        )}
                    </div>

                    {/* Confirmation Modal */}
                    {showConfirmation && (
                        <div className="btl-modal-overlay">
                            <div className="btl-modal">
                                <h3>{__('Confirm Bulk Generation', 'betterlinks')}</h3>
                                <div className="btl-summary">
                                    <p><strong>{__('Post Type:', 'betterlinks')}</strong> {selectedPostType.label}</p>
                                    <p><strong>{__('Categories:', 'betterlinks')}</strong> {selectedCategories.map(cat => cat.label).join(', ')}</p>
                                    {selectedTags.length > 0 && (
                                        <p><strong>{__('Tags:', 'betterlinks')}</strong> {selectedTags.map(tag => tag.label).join(', ')}</p>
                                    )}
                                    <p><strong>{__('Redirect Type:', 'betterlinks')}</strong> {redirectType}</p>
                                    {categoryAssignment === 'betterlink' && selectedBetterlinkCategory && (
                                        <p><strong>{__('BetterLink Category:', 'betterlinks')}</strong> {selectedBetterlinkCategory.label}</p>
                                    )}
                                    {categoryAssignment === 'custom' && customCategory && (
                                        <p><strong>{__('Custom Category:', 'betterlinks')}</strong> {customCategory}</p>
                                    )}
                                    <p className="btl-count">
                                        <strong>{__('Generate short links for', 'betterlinks')} {postCount} {__('posts', 'betterlinks')}</strong>
                                    </p>
                                </div>
                                <div className="btl-modal-actions">
                                    <button
                                        className="btl-btn btl-btn-secondary"
                                        onClick={() => setShowConfirmation(false)}
                                    >
                                        {__('Cancel', 'betterlinks')}
                                    </button>
                                    <button
                                        className="btl-btn btl-btn-primary"
                                        onClick={confirmGeneration}
                                    >
                                        {__('Confirm & Start', 'betterlinks')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* Progress Display */
                <div className="btl-progress-container">
                    <h3>{__('Generation in Progress', 'betterlinks')}</h3>
                    {generationStatus && (
                        <div className="btl-progress">
                            <div className="btl-progress-bar">
                                <div
                                    className="btl-progress-fill"
                                    style={{ width: `${generationStatus.progress_percent || 0}%` }}
                                ></div>
                            </div>
                            <div className="btl-progress-info">
                                <p>{__('Progress:', 'betterlinks')} {generationStatus.progress_percent || 0}%</p>
                                <p>{__('Processed:', 'betterlinks')} {generationStatus.processed || 0} / {generationStatus.total || 0}</p>
                                <p>{__('Successful:', 'betterlinks')} {generationStatus.successful || 0}</p>
                                <p>{__('Failed:', 'betterlinks')} {generationStatus.failed || 0}</p>
                                {generationStatus.message && <p>{generationStatus.message}</p>}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShortLinkGenerator;
